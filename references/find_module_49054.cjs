const fs = require('fs');
const path = require('path');

const chunkDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

for (const f of files) {
  const text = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  const idx = text.indexOf('49054');
  if (idx !== -1) {
    console.log(`Match in ${f}:`);
    const reg = /49054\s*,\s*[^=>]*=>[\s\S]*?\}\)/g;
    const m = text.match(reg);
    if (m) console.log(m[0].slice(0, 1000));
    else console.log(text.slice(idx, idx + 500));
  }
}
