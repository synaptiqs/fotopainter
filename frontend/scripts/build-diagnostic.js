#!/usr/bin/env node

/**
 * Build Diagnostic Script for Railway
 * Logs build environment and process information
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LOG_FILE = path.join(process.cwd(), '.cursor', 'debug.log');
const isPostBuild = process.argv.includes('--post');

// Ensure log directory exists
try {
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
} catch (err) {
  // Ignore if can't create directory
}

function log(data) {
  const logEntry = {
    sessionId: 'railway-build-debug',
    runId: process.env.RAILWAY_RUN_ID || 'build-1',
    hypothesisId: data.hypothesisId || 'A',
    location: data.location || 'build-diagnostic.js',
    message: data.message || '',
    data: data.data || {},
    timestamp: Date.now()
  };

  // Write to file (Railway can read this)
  const logLine = JSON.stringify(logEntry) + '\n';
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (err) {
    // Fallback: try HTTP
    try {
      require('http').request({
        hostname: '127.0.0.1',
        port: 7242,
        path: '/ingest/7627f6a7-3174-41ca-be84-48f47d5c4f53',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, () => {}).end(JSON.stringify(logEntry));
    } catch (e) {
      console.error('Log failed:', e.message);
    }
  }
}

// #region agent log
log({
  hypothesisId: 'A',
  location: 'build-diagnostic.js:start',
  message: isPostBuild ? 'Post-build diagnostic started' : 'Pre-build diagnostic started',
  data: { nodeVersion: process.version, platform: process.platform, cwd: process.cwd(), isPostBuild }
});
// #endregion

// Hypothesis A: Node version mismatch
try {
  const nodeVersion = process.version;
  log({
    hypothesisId: 'A',
    location: 'build-diagnostic.js:node-version',
    message: 'Node version check',
    data: { nodeVersion, expected: 'v20.x' }
  });
} catch (err) {
  log({
    hypothesisId: 'A',
    location: 'build-diagnostic.js:node-version-error',
    message: 'Node version check failed',
    data: { error: err.message }
  });
}

// Hypothesis B: npm/package issues
try {
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageLockPath = path.join(__dirname, '../package-lock.json');
  
  const packageJsonExists = fs.existsSync(packageJsonPath);
  const packageLockExists = fs.existsSync(packageLockPath);
  
  log({
    hypothesisId: 'B',
    location: 'build-diagnostic.js:package-files',
    message: 'Package file check',
    data: { packageJsonExists, packageLockExists }
  });

  if (packageJsonExists) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    log({
      hypothesisId: 'B',
      location: 'build-diagnostic.js:package-json',
      message: 'Package.json parsed',
      data: { 
        hasBuildScript: !!pkg.scripts?.build,
        hasStartScript: !!pkg.scripts?.start,
        dependenciesCount: Object.keys(pkg.dependencies || {}).length,
        devDependenciesCount: Object.keys(pkg.devDependencies || {}).length
      }
    });
  }
} catch (err) {
  log({
    hypothesisId: 'B',
    location: 'build-diagnostic.js:package-error',
    message: 'Package file check failed',
    data: { error: err.message }
  });
}

// Hypothesis C: Environment variables
try {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
    RAILWAY_PROJECT_ID: process.env.RAILWAY_PROJECT_ID ? 'set' : 'not-set'
  };
  
  log({
    hypothesisId: 'C',
    location: 'build-diagnostic.js:env-vars',
    message: 'Environment variables check',
    data: envVars
  });
} catch (err) {
  log({
    hypothesisId: 'C',
    location: 'build-diagnostic.js:env-error',
    message: 'Environment check failed',
    data: { error: err.message }
  });
}

// Hypothesis D: Next.js configuration
try {
  const nextConfigPath = path.join(__dirname, '../next.config.ts');
  const nextConfigExists = fs.existsSync(nextConfigPath);
  
  log({
    hypothesisId: 'D',
    location: 'build-diagnostic.js:next-config',
    message: 'Next.js config check',
    data: { nextConfigExists }
  });

  if (nextConfigExists) {
    const configContent = fs.readFileSync(nextConfigPath, 'utf8');
    log({
      hypothesisId: 'D',
      location: 'build-diagnostic.js:next-config-content',
      message: 'Next.js config content',
      data: { 
        hasStandalone: configContent.includes('standalone'),
        configLength: configContent.length
      }
    });
  }
} catch (err) {
  log({
    hypothesisId: 'D',
    location: 'build-diagnostic.js:next-config-error',
    message: 'Next.js config check failed',
    data: { error: err.message }
  });
}

// Hypothesis E: File system and permissions
try {
  const appDir = path.join(__dirname, '../app');
  const appDirExists = fs.existsSync(appDir);
  const canWrite = fs.accessSync ? true : false;
  
  log({
    hypothesisId: 'E',
    location: 'build-diagnostic.js:filesystem',
    message: 'File system check',
    data: { 
      appDirExists,
      cwd: process.cwd(),
      canWrite
    }
  });
} catch (err) {
  log({
    hypothesisId: 'E',
    location: 'build-diagnostic.js:filesystem-error',
    message: 'File system check failed',
    data: { error: err.message }
  });
}

// Hypothesis F: Build output check (post-build only)
if (isPostBuild) {
  try {
    const nextDir = path.join(__dirname, '../.next');
    const standaloneDir = path.join(__dirname, '../.next/standalone');
    const staticDir = path.join(__dirname, '../.next/static');
    
    const nextExists = fs.existsSync(nextDir);
    const standaloneExists = fs.existsSync(standaloneDir);
    const staticExists = fs.existsSync(staticDir);
    
    log({
      hypothesisId: 'F',
      location: 'build-diagnostic.js:build-output',
      message: 'Build output check',
      data: { nextExists, standaloneExists, staticExists }
    });

    if (standaloneExists) {
      const standaloneFiles = fs.readdirSync(standaloneDir);
      log({
        hypothesisId: 'F',
        location: 'build-diagnostic.js:standalone-files',
        message: 'Standalone directory contents',
        data: { fileCount: standaloneFiles.length, files: standaloneFiles.slice(0, 10) }
      });
    }
  } catch (err) {
    log({
      hypothesisId: 'F',
      location: 'build-diagnostic.js:build-output-error',
      message: 'Build output check failed',
      data: { error: err.message }
    });
  }
}

// #region agent log
log({
  hypothesisId: 'ALL',
  location: 'build-diagnostic.js:end',
  message: 'Build diagnostic completed',
  data: { isPostBuild }
});
// #endregion

// Also output to console for Railway logs
console.log(`[BUILD-DIAG] ${isPostBuild ? 'Post' : 'Pre'}-build diagnostic completed`);
console.log(`[BUILD-DIAG] Node version: ${process.version}`);
console.log(`[BUILD-DIAG] Log file: ${LOG_FILE}`);

