const { execSync } = require('child_process');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const routes = [
  { path: '/puppies/maltipoo-max-male', expect: 'Max' },
  { path: '/happy-families', expect: 'Happy families' },
  { path: '/how-it-works', expect: 'How it works' },
  { path: '/faq', expect: 'Questions & answers' },
  { path: '/contact', expect: 'Get in touch' },
  { path: '/gone-home', expect: 'Gone home' }
];

console.log('Verifying client rendering on all remaining routes using headless Microsoft Edge...');
for (const r of routes) {
  const tmpDir = 'C:\\Users\\Rudra Panchal\\AppData\\Local\\Temp\\edge_' + Math.random().toString(36).slice(2);
  const cmd = `"${edgePath}" --headless --disable-gpu --user-data-dir="${tmpDir}" --dump-dom http://127.0.0.1:4173${r.path}`;
  try {
    const output = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const match = output.includes(r.expect);
    console.log(`Route ${r.path.padEnd(28)} -> contains '${r.expect}': ${match}`);
  } catch (err) {
    console.error(`Failed on ${r.path}`, err.message);
  }
}
