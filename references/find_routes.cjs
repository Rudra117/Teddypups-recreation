const fs = require('fs');
const path = require('path');

const chunkDir = path.join(__dirname, 'chunks');
if (!fs.existsSync(chunkDir)) {
  console.log('No chunks dir');
  process.exit(0);
}

const files = fs.readdirSync(chunkDir);
const routes = new Set();
for (const f of files) {
  const content = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  const matches = content.match(/\"\/[a-zA-Z0-9_\-\/]+\"/g);
  if (matches) {
    for (const m of matches) {
      const clean = m.replace(/\"/g, '');
      if (!clean.includes('/_next') && !clean.includes('/api') && clean.length > 1 && clean.length < 50) {
        routes.add(clean);
      }
    }
  }
}

console.log('Discovered routes in chunks:');
console.log(Array.from(routes).sort());
