# Quick GitHub Setup - Step by Step

## 🚀 Fastest Way to Push to GitHub

### Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Fill in:
   - **Repository name**: `fotopainter`
   - **Description**: "AI-powered platform that transforms photos into paint-by-number artworks"
   - **Visibility**: Choose Public or Private
   - ⚠️ **IMPORTANT**: Do NOT check any boxes (no README, no .gitignore, no license)
3. Click **"Create repository"**

### Step 2: Copy Your Repository URL

After creating, GitHub will show you a URL like:
- `https://github.com/YOUR_USERNAME/fotopainter.git`

**Copy this URL** - you'll need it in the next step.

### Step 3: Run the Setup Script

Open PowerShell in this directory and run:

```powershell
.\scripts\setup-github.ps1 -RepoUrl "https://github.com/YOUR_USERNAME/fotopainter.git"
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Alternative: Manual Commands

If the script doesn't work, run these commands manually:

```powershell
# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/fotopainter.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## 🔐 Authentication

When you push, GitHub will ask for credentials:

### Option A: Personal Access Token (Recommended)
1. Create token: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `repo` (full control)
4. Copy the token
5. When prompted for password, paste the token (not your GitHub password)

### Option B: GitHub CLI
```powershell
# Install GitHub CLI, then:
gh auth login
gh repo create fotopainter --public --source=. --remote=origin --push
```

## ✅ Verify Success

After pushing, visit:
- `https://github.com/YOUR_USERNAME/fotopainter`

You should see all your files and commit history!

---

**Need help?** See `GITHUB_SETUP_INSTRUCTIONS.md` for detailed troubleshooting.

