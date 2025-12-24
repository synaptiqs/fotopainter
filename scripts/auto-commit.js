#!/usr/bin/env node

/**
 * Auto-commit script for Fotopainter
 * Automatically commits and pushes changes to git
 */

const simpleGit = require('simple-git');
const path = require('path');

const git = simpleGit(process.cwd());

async function autoCommit() {
  try {
    console.log('🔄 Starting auto-commit process...');

    // Check if there are changes
    const status = await git.status();
    
    if (status.files.length === 0) {
      console.log('✅ No changes to commit.');
      return;
    }

    // Get current branch
    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
    console.log(`📍 Current branch: ${branch}`);

    // Stage all changes
    console.log('📦 Staging changes...');
    await git.add('.');

    // Create commit with timestamp
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const commitMsg = `Auto-commit: ${timestamp}\n\n- Automated commit from development workflow`;

    console.log('💾 Creating commit...');
    await git.commit(commitMsg);

    // Push to remote
    console.log('🚀 Pushing to remote...');
    await git.push('origin', branch);

    console.log('✅ Auto-commit completed successfully!');
  } catch (error) {
    if (error.message.includes('nothing to commit')) {
      console.log('ℹ️  No changes to commit.');
    } else if (error.message.includes('no upstream branch')) {
      console.log('⚠️  No upstream branch configured. Run: git push -u origin <branch>');
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

autoCommit();

