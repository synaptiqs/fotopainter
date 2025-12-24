# Railway Build Debug - Hypotheses

## Hypotheses Generated

### Hypothesis A: Node Version Mismatch
**Theory**: Railway is not using Node.js 20.x as specified in nixpacks.toml, causing Next.js 16 build failures (requires Node >=20.9.0).

**Evidence to collect**:
- Actual Node version during build
- Whether nixpacks.toml is being read
- Build error messages mentioning Node version

### Hypothesis B: npm/package.json Issues
**Theory**: `npm ci` is failing due to missing or corrupted package-lock.json, or dependency resolution issues.

**Evidence to collect**:
- Whether package-lock.json exists
- npm ci success/failure
- Dependency installation errors
- Missing dependencies in node_modules

### Hypothesis C: Missing Environment Variables
**Theory**: Required environment variables (NEXT_PUBLIC_API_URL, NODE_ENV, PORT) are not set, causing build-time or runtime failures.

**Evidence to collect**:
- Environment variables present during build
- Build errors related to undefined variables
- Runtime errors after deployment

### Hypothesis D: Next.js Configuration Issues
**Theory**: The standalone output mode or other Next.js config is causing build failures or deployment issues.

**Evidence to collect**:
- next.config.ts is being read correctly
- Standalone output is generated
- Build errors related to Next.js config

### Hypothesis E: File System/Permissions Issues
**Theory**: Railway build environment lacks proper file system access or permissions for Next.js build process.

**Evidence to collect**:
- File system access errors
- Permission denied errors
- Missing directories or files

### Hypothesis F: Build Output Issues
**Theory**: Next.js build completes but output is missing or incorrectly structured, causing start command to fail.

**Evidence to collect**:
- .next directory exists after build
- Standalone directory structure
- Missing build artifacts

## Instrumentation Added

1. **build-diagnostic.js**: Comprehensive diagnostic script that logs:
   - Node version (Hypothesis A)
   - Package files existence (Hypothesis B)
   - Environment variables (Hypothesis C)
   - Next.js config (Hypothesis D)
   - File system checks (Hypothesis E)
   - Build output verification (Hypothesis F)

2. **package.json scripts**:
   - `prebuild`: Runs diagnostic before build
   - `postbuild`: Runs diagnostic after build
   - Logs written to `.cursor/debug.log`

## Next Steps

The diagnostic script will run automatically during Railway builds. After the next build attempt, check:
1. Railway build logs (console output)
2. `.cursor/debug.log` file (if accessible)
3. Build error messages

