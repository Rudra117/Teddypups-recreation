const fs = require('fs');
const path = require('path');
const chunkDir = path.join(__dirname, 'chunks');
const files = fs.readdirSync(chunkDir);

for (const f of files) {
  const content = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  if (content.includes('sticky') && (content.includes('translateX') || content.includes('scroll') || content.includes('puppy') || content.includes('door'))) {
    console.log('Found sticky / transform in:', f);
    const matches = content.match(/.{0,80}(?:sticky|translateX|scrollProgress|scrollWidth).{0,80}/g);
    if (matches) matches.slice(0, 5).forEach(m => console.log(' ->', m));
  }
}
