# Auto-commit script for Fotopainter (PowerShell)
# This script automatically commits and pushes changes

$ErrorActionPreference = "Stop"

Write-Host "Starting auto-commit process..." -ForegroundColor Blue

# Check if there are changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Green
    exit 0
}

# Get current branch
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch" -ForegroundColor Blue

# Add all changes
Write-Host "Staging changes..." -ForegroundColor Blue
git add .

# Create commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMsg = @"
Auto-commit: $timestamp

- Automated commit from development workflow
"@

Write-Host "Creating commit..." -ForegroundColor Blue
try {
    git commit -m $commitMsg
} catch {
    Write-Host "No changes to commit" -ForegroundColor Yellow
    exit 0
}

# Push to remote
Write-Host "Pushing to remote..." -ForegroundColor Blue
try {
    git push origin $branch
    Write-Host "Auto-commit completed successfully!" -ForegroundColor Green
} catch {
    Write-Host "Failed to push. Make sure remote is configured." -ForegroundColor Red
    exit 1
}

