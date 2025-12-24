#!/usr/bin/env node

/**
 * Auto-push script for Fotopainter
 * Automatically pushes current branch to GitHub after verifying changes
 */

const simpleGit = require('simple-git');
const path = require('path');

const git = simpleGit(process.cwd());

async function autoPush() {
  try {
    console.log('🚀 Starting auto-push to GitHub...\n');

    // Check if we're in a git repository
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      console.error('❌ Not a git repository. Run this from the project root.');
      process.exit(1);
    }

    // Check for remote
    const remotes = await git.getRemotes(true);
    const origin = remotes.find(r => r.name === 'origin');
    
    if (!origin) {
      console.error('❌ No remote "origin" configured.');
      console.log('💡 Set up remote with: git remote add origin <your-repo-url>');
      process.exit(1);
    }

    console.log(`📍 Remote: ${origin.refs.fetch}\n`);

    // Get current branch
    const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
    console.log(`🌿 Current branch: ${branch}\n`);

    // Check for uncommitted changes
    const status = await git.status();
    if (status.files.length > 0) {
      console.log('⚠️  You have uncommitted changes:');
      status.files.forEach(file => {
        console.log(`   ${file.path} (${file.working_dir})`);
      });
      console.log('\n💡 Commit your changes first, then run this script again.');
      process.exit(1);
    }

    // Check if branch is ahead of remote
    const log = await git.log([`${branch}..origin/${branch}`]);
    const ahead = await git.log([`origin/${branch}..${branch}`]);
    
    if (ahead.total === 0) {
      console.log('✅ Branch is up to date with remote. Nothing to push.');
      return;
    }

    console.log(`📤 Pushing ${ahead.total} commit(s) to GitHub...\n`);

    // Push to remote
    await git.push('origin', branch);

    console.log('✅ Successfully pushed to GitHub!\n');
    console.log(`🔗 View repository: ${origin.refs.fetch.replace('.git', '')}\n`);
    
    // Show recent commits
    const recentCommits = await git.log([branch, '-5']);
    console.log('📝 Recent commits:');
    recentCommits.all.slice(0, 3).forEach(commit => {
      console.log(`   ${commit.hash.substring(0, 7)} - ${commit.message}`);
    });
    console.log('');

  } catch (error) {
    if (error.message.includes('no upstream branch')) {
      console.log('⚠️  No upstream branch configured.');
      console.log(`💡 Setting upstream and pushing...\n`);
      
      const branch = await git.revparse(['--abbrev-ref', 'HEAD']);
      await git.push(['-u', 'origin', branch]);
      console.log('✅ Successfully pushed and set upstream!\n');
    } else if (error.message.includes('Authentication')) {
      console.error('❌ Authentication failed.');
      console.log('💡 Set up authentication:');
      console.log('   - Use Personal Access Token for HTTPS');
      console.log('   - Or set up SSH keys');
      console.log('   - Or use: gh auth login (GitHub CLI)');
      process.exit(1);
    } else {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

autoPush();

