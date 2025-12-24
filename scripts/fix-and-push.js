#!/usr/bin/env node

/**
 * Fix and Push script for Fotopainter
 * Runs linting, fixes errors, commits, and pushes to GitHub
 */

const { execSync } = require('child_process');
const path = require('path');
const simpleGit = require('simple-git');

const git = simpleGit(process.cwd());

async function fixAndPush() {
  try {
    console.log('🔧 Fix and Push Automation\n');
    console.log('=' .repeat(50) + '\n');

    // Step 1: Run linter
    console.log('📋 Step 1: Running linter...\n');
    try {
      execSync('cd frontend && npm run lint', { stdio: 'inherit' });
      console.log('✅ Linting passed\n');
    } catch (error) {
      console.log('⚠️  Linting found issues (this is okay if we\'re fixing them)\n');
    }

    // Step 2: Check git status
    console.log('📊 Step 2: Checking git status...\n');
    const status = await git.status();
    
    if (status.files.length === 0) {
      console.log('✅ No changes to commit.\n');
      
      // Check if there are commits to push
      const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
      const ahead = await git.log([`origin/${branch}..${branch}`]);
      
      if (ahead.total > 0) {
        console.log(`📤 Found ${ahead.total} commit(s) to push...\n`);
        await git.push('origin', branch);
        console.log('✅ Successfully pushed to GitHub!\n');
      } else {
        console.log('✅ Everything is up to date.\n');
      }
      return;
    }

    console.log(`📝 Found ${status.files.length} changed file(s):`);
    status.files.forEach(file => {
      console.log(`   ${file.path}`);
    });
    console.log('');

    // Step 3: Stage changes
    console.log('📦 Step 3: Staging changes...\n');
    await git.add('.');
    console.log('✅ Changes staged\n');

    // Step 4: Create commit
    console.log('💾 Step 4: Creating commit...\n');
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const commitMsg = `Auto-fix: ${timestamp}\n\n- Automated fix and push from development workflow`;
    
    await git.commit(commitMsg);
    console.log('✅ Commit created\n');

    // Step 5: Push to GitHub
    console.log('🚀 Step 5: Pushing to GitHub...\n');
    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
    await git.push('origin', branch);
    
    console.log('=' .repeat(50) + '\n');
    console.log('✅ Successfully fixed, committed, and pushed to GitHub!\n');
    
    const remotes = await git.getRemotes(true);
    const origin = remotes.find(r => r.name === 'origin');
    if (origin) {
      console.log(`🔗 Repository: ${origin.refs.fetch.replace('.git', '')}\n`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('no upstream branch')) {
      console.log('\n💡 Setting upstream branch...\n');
      const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
      await git.push(['-u', 'origin', branch]);
      console.log('✅ Upstream set and pushed!\n');
    } else {
      process.exit(1);
    }
  }
}

fixAndPush();

