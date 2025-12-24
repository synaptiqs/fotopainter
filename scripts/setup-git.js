#!/usr/bin/env node

/**
 * Git setup script for Fotopainter
 * Helps set up git repository and remote
 */

const simpleGit = require('simple-git');
const readline = require('readline');

const git = simpleGit(process.cwd());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupGit() {
  try {
    console.log('🔧 Setting up Git repository...\n');

    // Check if git is initialized
    const isRepo = await git.checkIsRepo();
    
    if (!isRepo) {
      console.log('📦 Initializing git repository...');
      await git.init();
      console.log('✅ Git repository initialized.\n');
    } else {
      console.log('✅ Git repository already initialized.\n');
    }

    // Check for remote
    const remotes = await git.getRemotes(true);
    const hasOrigin = remotes.some(r => r.name === 'origin');

    if (!hasOrigin) {
      console.log('🌐 Setting up remote repository...');
      const repoUrl = await question('Enter your GitHub repository URL (or press Enter to skip): ');
      
      if (repoUrl.trim()) {
        await git.addRemote('origin', repoUrl.trim());
        console.log('✅ Remote added.\n');
      } else {
        console.log('⚠️  Skipping remote setup. You can add it later with:');
        console.log('   git remote add origin <your-repo-url>\n');
      }
    } else {
      console.log('✅ Remote already configured.');
      remotes.forEach(r => {
        console.log(`   ${r.name}: ${r.refs.fetch}`);
      });
      console.log('');
    }

    // Create initial commit if needed
    const status = await git.status();
    if (status.files.length > 0) {
      console.log('📝 Creating initial commit...');
      await git.add('.');
      await git.commit('Initial commit: Fotopainter project setup');
      console.log('✅ Initial commit created.\n');
    }

    // Suggest next steps
    console.log('🎉 Git setup complete!\n');
    console.log('Next steps:');
    console.log('1. If you added a remote, push your code:');
    console.log('   git push -u origin main');
    console.log('2. Set up GitHub Actions secrets in your repository:');
    console.log('   - RAILWAY_TOKEN');
    console.log('   - RAILWAY_PROJECT_ID');
    console.log('   - NEXT_PUBLIC_API_URL (optional)');
    console.log('\n3. Use auto-commit script:');
    console.log('   npm run auto-commit');

    rl.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

setupGit();

