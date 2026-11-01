const fs = require('fs');
const path = require('path');

const chunkDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

// Search for Path2D or module 49054 in chunks
for (const f of files) {
  const text = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  if (text.includes('49054') || text.includes('Path2D') || text.includes('tp-curtain__blanket')) {
    console.log(`Found in ${f}:`);
    const lines = text.split('\n');
    lines.forEach(l => {
      if (l.includes('49054') || (l.includes('M') && l.includes('C') && l.includes('Z') && l.length > 50 && l.length < 500)) {
        console.log('Line snippet:', l.slice(0, 300));
      }
    });
  }
}
