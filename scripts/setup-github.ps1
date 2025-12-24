# GitHub Repository Setup Script for Fotopainter
# This script helps set up and push to GitHub

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl
)

Write-Host "🚀 Setting up GitHub repository..." -ForegroundColor Blue
Write-Host ""

# Validate URL format
if ($RepoUrl -notmatch "^https://github\.com/|^git@github\.com:") {
    Write-Host "❌ Invalid GitHub URL format." -ForegroundColor Red
    Write-Host "Expected format: https://github.com/username/repo-name.git" -ForegroundColor Yellow
    Write-Host "Or: git@github.com:username/repo-name.git" -ForegroundColor Yellow
    exit 1
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to replace it? (y/n)"
    if ($overwrite -eq 'y' -or $overwrite -eq 'Y') {
        git remote remove origin
        Write-Host "✅ Removed existing remote" -ForegroundColor Green
    } else {
        Write-Host "❌ Aborted. Keeping existing remote." -ForegroundColor Red
        exit 1
    }
}

# Add remote
Write-Host "📡 Adding remote repository..." -ForegroundColor Blue
git remote add origin $RepoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to add remote" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Remote added successfully" -ForegroundColor Green
Write-Host ""

# Rename branch to main (if on master)
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "master") {
    Write-Host "🔄 Renaming branch from 'master' to 'main'..." -ForegroundColor Blue
    git branch -M main
    Write-Host "✅ Branch renamed to 'main'" -ForegroundColor Green
    Write-Host ""
}

# Push to GitHub
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Blue
Write-Host ""

$branch = git rev-parse --abbrev-ref HEAD
git push -u origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Repository is now live at:" -ForegroundColor Cyan
    Write-Host "   $RepoUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Set up GitHub Secrets for CI/CD:" -ForegroundColor White
    Write-Host "   - RAILWAY_TOKEN" -ForegroundColor Gray
    Write-Host "   - RAILWAY_PROJECT_ID" -ForegroundColor Gray
    Write-Host "2. Enable GitHub Actions in repository settings" -ForegroundColor White
    Write-Host "3. Your code will auto-deploy on push to main branch" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Failed to push to GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Repository doesn't exist - create it on GitHub first" -ForegroundColor White
    Write-Host "2. Authentication required - set up SSH keys or use GitHub CLI" -ForegroundColor White
    Write-Host "3. No write access - check repository permissions" -ForegroundColor White
    Write-Host ""
    Write-Host "To create the repository on GitHub:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new" -ForegroundColor White
    Write-Host "2. Name it 'fotopainter' (or your preferred name)" -ForegroundColor White
    Write-Host "3. Don't initialize with README (we already have one)" -ForegroundColor White
    Write-Host "4. Run this script again with the repository URL" -ForegroundColor White
    exit 1
}

