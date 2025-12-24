# Auto-push script for Fotopainter (PowerShell)
# Automatically pushes current branch to GitHub

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting auto-push to GitHub...`n" -ForegroundColor Blue

# Check if we're in a git repository
try {
    $null = git rev-parse --git-dir 2>$null
} catch {
    Write-Host "❌ Not a git repository. Run this from the project root." -ForegroundColor Red
    exit 1
}

# Check for remote
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Host "❌ No remote 'origin' configured." -ForegroundColor Red
    Write-Host "💡 Set up remote with: git remote add origin <your-repo-url>" -ForegroundColor Yellow
    exit 1
}

Write-Host "📍 Remote: $remote`n" -ForegroundColor Cyan

# Get current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "🌿 Current branch: $branch`n" -ForegroundColor Cyan

# Check for uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  You have uncommitted changes:" -ForegroundColor Yellow
    $status | ForEach-Object { Write-Host "   $_" }
    Write-Host "`n💡 Commit your changes first, then run this script again." -ForegroundColor Yellow
    exit 1
}

# Check if there are commits to push
$statusOutput = git status -sb
if ($statusOutput -match '\[ahead (\d+)\]') {
    $aheadCount = $matches[1]
    Write-Host "📤 Pushing $aheadCount commit(s) to GitHub...`n" -ForegroundColor Blue
    
    try {
        git push origin $branch
        Write-Host "✅ Successfully pushed to GitHub!`n" -ForegroundColor Green
        Write-Host "🔗 View repository: $($remote -replace '\.git$', '')`n" -ForegroundColor Cyan
        
        # Show recent commits
        Write-Host "📝 Recent commits:" -ForegroundColor Cyan
        git log --oneline -3 | ForEach-Object { Write-Host "   $_" }
        Write-Host ""
    } catch {
        Write-Host "❌ Failed to push: $_" -ForegroundColor Red
        exit 1
    }
} elseif ($statusOutput -match '\[behind') {
    Write-Host "⚠️  Branch is behind remote. Pull first with: git pull" -ForegroundColor Yellow
} else {
    Write-Host "✅ Branch is up to date with remote. Nothing to push." -ForegroundColor Green
}

