# Git Setup and Automation Guide

## ✅ What's Been Set Up

### 1. Git Repository ✅
- ✅ Git repository initialized in root directory
- ✅ Comprehensive `.gitignore` file created
- ✅ Initial commit created with all project files

### 2. GitHub Actions CI/CD ✅
- ✅ **CI Pipeline** (`.github/workflows/ci.yml`):
  - Runs on every push/PR
  - Builds and tests frontend
  - Lints code
  - Ready for backend tests when added

- ✅ **Deploy Pipeline** (`.github/workflows/deploy.yml`):
  - Auto-deploys to Railway on `main` branch
  - Deploys both frontend and backend
  - Uses Railway tokens from GitHub secrets

### 3. Auto-Commit Scripts ✅
- ✅ **Node.js script** (`scripts/auto-commit.js`) - Cross-platform
- ✅ **PowerShell script** (`scripts/auto-commit.ps1`) - Windows
- ✅ **Bash script** (`scripts/auto-commit.sh`) - Linux/Mac
- ✅ **Setup script** (`scripts/setup-git.js`) - Helps configure git

## 🚀 Next Steps

### 1. Connect to GitHub

#### Option A: Create New Repository on GitHub
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `fotopainter` (or your preferred name)
3. **Don't** initialize with README (we already have one)

#### Option B: Use Existing Repository
If you already have a GitHub repository URL, skip to step 2.

### 2. Add Remote and Push

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/fotopainter.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Set Up GitHub Secrets (For Auto-Deployment)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:

   - **RAILWAY_TOKEN**: Your Railway API token
     - Get it from: Railway Dashboard → Settings → Tokens
   
   - **RAILWAY_PROJECT_ID**: Your Railway project ID
     - Found in Railway project settings
   
   - **NEXT_PUBLIC_API_URL** (optional): Your API URL
     - Example: `https://api.fotopainter.com/api/v1`

### 4. Enable GitHub Actions

GitHub Actions are automatically enabled when you push the `.github/workflows/` directory.

## 🤖 Using Auto-Commit

### Method 1: npm Script (Recommended)
```bash
npm install  # Install dependencies first
npm run auto-commit
```

### Method 2: Direct Script
```bash
# Node.js (cross-platform)
node scripts/auto-commit.js

# PowerShell (Windows)
.\scripts\auto-commit.ps1

# Bash (Linux/Mac)
chmod +x scripts/auto-commit.sh
./scripts/auto-commit.sh
```

### What Auto-Commit Does
1. Checks for uncommitted changes
2. Stages all changes (`git add .`)
3. Creates commit with timestamp
4. Pushes to current branch

## 📋 Git Workflow

### Daily Development
```bash
# Make your changes...

# Option 1: Auto-commit
npm run auto-commit

# Option 2: Manual commit
git add .
git commit -m "Your descriptive message"
git push
```

### Feature Development
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add feature X"

# Push feature branch
git push -u origin feature/your-feature-name

# Create PR on GitHub, then merge to main
```

## 🔄 Automated Workflows

### On Push to `main`
- ✅ Frontend builds automatically
- ✅ Tests run (when configured)
- ✅ Auto-deploys to Railway (if secrets configured)

### On Pull Request
- ✅ Frontend builds
- ✅ Linting checks
- ✅ Tests run
- ❌ Does NOT deploy (safety)

## 🛠️ Troubleshooting

### "No upstream branch" Error
```bash
# Set upstream branch
git push -u origin main
```

### "Remote already exists" Error
```bash
# Check existing remotes
git remote -v

# Remove and re-add if needed
git remote remove origin
git remote add origin YOUR_REPO_URL
```

### GitHub Actions Not Running
1. Check that `.github/workflows/` files are committed
2. Verify Actions are enabled in repository settings
3. Check Actions tab for error messages

### Railway Deployment Failing
1. Verify `RAILWAY_TOKEN` secret is set correctly
2. Verify `RAILWAY_PROJECT_ID` matches your project
3. Check Railway project settings for service names

## 📝 Commit Message Guidelines

### Good Commit Messages
```
feat: Add image upload functionality
fix: Resolve palette selector bug
docs: Update README with setup instructions
style: Format code with prettier
refactor: Simplify API client structure
```

### Auto-Commit Format
Auto-commit uses this format:
```
Auto-commit: 2024-01-15 14:30:00

- Automated commit from development workflow
```

## 🔐 Security Notes

- ✅ `.env` files are in `.gitignore` (never committed)
- ✅ API keys should be in GitHub Secrets, not code
- ✅ Railway tokens are stored as GitHub Secrets
- ⚠️ Never commit sensitive data

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Railway Docs](https://docs.railway.app)

---

**Status**: ✅ Git repository initialized and ready for GitHub connection!

