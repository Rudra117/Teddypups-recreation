const fs = require('fs');
const path = require('path');
const chunkDir = path.join(__dirname, 'chunks');
const files = fs.readdirSync(chunkDir).concat(fs.readdirSync(__dirname).filter(f => f.endsWith('.css') || f.endsWith('.html')));

for (const f of files) {
  const p = path.join(f.endsWith('.js') ? chunkDir : __dirname, f);
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) continue;
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes('cursor:url') || content.includes('cursor: url')) {
    console.log('Found cursor definition in:', f);
    const matches = content.match(/.{0,100}cursor:\s*url[^;]+;.{0,100}/g);
    if (matches) matches.forEach(m => console.log(' ->', m));
  }
}
