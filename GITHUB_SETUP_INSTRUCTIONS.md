# GitHub Repository Setup Instructions

## Quick Setup (Automated)

### Option 1: Using the Setup Script (Recommended)

1. **Create the GitHub repository first:**
   - Go to https://github.com/new
   - Repository name: `fotopainter` (or your preferred name)
   - Description: "AI-powered platform that transforms photos into paint-by-number artworks"
   - Choose Public or Private
   - **Important**: Do NOT initialize with README, .gitignore, or license (we already have these)
   - Click "Create repository"

2. **Run the setup script:**
   ```powershell
   .\scripts\setup-github.ps1 -RepoUrl "https://github.com/YOUR_USERNAME/fotopainter.git"
   ```
   
   Replace `YOUR_USERNAME` with your GitHub username.

### Option 2: Manual Setup

If you prefer to set it up manually:

```bash
# 1. Create repository on GitHub (see step 1 above)

# 2. Add remote
git remote add origin https://github.com/YOUR_USERNAME/fotopainter.git

# 3. Rename branch to main (if needed)
git branch -M main

# 4. Push to GitHub
git push -u origin main
```

## Authentication

### Option A: HTTPS (Easiest)
- GitHub will prompt for username and password
- For password, use a **Personal Access Token** (not your GitHub password)
- Create token at: https://github.com/settings/tokens
- Select scopes: `repo` (full control of private repositories)

### Option B: SSH (Recommended for frequent use)
1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add SSH key to GitHub:
   - Copy public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key

3. Use SSH URL when adding remote:
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/fotopainter.git
   ```

### Option C: GitHub CLI
```bash
# Install GitHub CLI if not installed
# Then authenticate:
gh auth login

# Create and push in one command:
gh repo create fotopainter --public --source=. --remote=origin --push
```

## After Pushing

### 1. Verify on GitHub
- Visit your repository URL
- Check that all files are present
- Verify commit history

### 2. Set Up GitHub Secrets (For Auto-Deployment)

Go to: **Repository → Settings → Secrets and variables → Actions**

Add these secrets:
- **RAILWAY_TOKEN**: Your Railway API token
  - Get from: Railway Dashboard → Settings → Tokens
- **RAILWAY_PROJECT_ID**: Your Railway project ID
  - Found in Railway project settings

### 3. Enable GitHub Actions
- Actions are automatically enabled when you push `.github/workflows/` directory
- Check Actions tab to see workflows

### 4. Test Auto-Deployment
- Make a small change
- Commit and push
- Check GitHub Actions tab for deployment status

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the URL is correct
- Verify you have access to the repository

### "Authentication failed"
- Use Personal Access Token instead of password for HTTPS
- Or set up SSH keys
- Or use GitHub CLI: `gh auth login`

### "Permission denied"
- Check repository permissions
- Verify SSH key is added to GitHub account
- Try HTTPS instead of SSH (or vice versa)

### "Remote already exists"
- Remove existing remote: `git remote remove origin`
- Or use different name: `git remote add github https://...`

## Next Steps After Setup

1. ✅ **Repository is live on GitHub**
2. ⏳ **Set up GitHub Secrets** (for Railway deployment)
3. ⏳ **Test GitHub Actions** (make a commit and push)
4. ⏳ **Configure Railway** (connect GitHub repo to Railway)

## Quick Reference

```bash
# Check remote
git remote -v

# Change remote URL
git remote set-url origin NEW_URL

# Push to GitHub
git push origin main

# Pull from GitHub
git pull origin main

# View repository on GitHub
# https://github.com/YOUR_USERNAME/fotopainter
```

---

**Ready to push!** Follow the steps above to get your code on GitHub. 🚀

