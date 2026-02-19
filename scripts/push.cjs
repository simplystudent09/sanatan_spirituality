const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('No .env file found. Add GITHUB_TOKEN=your_token to .env');
  process.exit(1);
}
const envContent = fs.readFileSync(envPath, 'utf8');
let token = '';
for (const line of envContent.split('\n')) {
  const m = line.match(/^\s*GITHUB_TOKEN\s*=\s*(.+)$/);
  if (m) {
    token = m[1].trim().replace(/^["']|["']$/g, '');
    break;
  }
}
if (!token) {
  console.error('GITHUB_TOKEN not found in .env');
  process.exit(1);
}

const repoRoot = path.join(__dirname, '..');
const remote = `https://${token}@github.com/simplystudent09/sanatan_spirituality.git`;
try {
  execSync(`git remote set-url origin "${remote}"`, { cwd: repoRoot, stdio: 'inherit' });
  execSync('git push origin main', { cwd: repoRoot, stdio: 'inherit' });
} finally {
  execSync('git remote set-url origin https://github.com/simplystudent09/sanatan_spirituality.git', {
    cwd: repoRoot,
    stdio: 'inherit'
  });
}
