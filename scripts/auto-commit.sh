#!/bin/bash

# Auto-commit script for Fotopainter
# This script automatically commits and pushes changes

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting auto-commit process...${NC}"

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${GREEN}No changes to commit.${NC}"
    exit 0
fi

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}Current branch: ${BRANCH}${NC}"

# Add all changes
echo -e "${BLUE}Staging changes...${NC}"
git add .

# Create commit with timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto-commit: $TIMESTAMP

- Automated commit from development workflow"

echo -e "${BLUE}Creating commit...${NC}"
git commit -m "$COMMIT_MSG" || {
    echo "No changes to commit"
    exit 0
}

# Push to remote
echo -e "${BLUE}Pushing to remote...${NC}"
git push origin "$BRANCH" || {
    echo "Failed to push. Make sure remote is configured."
    exit 1
}

echo -e "${GREEN}Auto-commit completed successfully!${NC}"

