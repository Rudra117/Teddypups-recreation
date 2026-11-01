const fs = require('fs');
const path = require('path');

const chunkDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\chunks';
const files = fs.readdirSync(chunkDir).filter(f => f.endsWith('.js'));

function searchInChunks(keyword) {
  console.log(`\n=== SEARCHING FOR: ${keyword} ===`);
  for (const f of files) {
    const text = fs.readFileSync(path.join(chunkDir, f), 'utf8');
    const idx = text.indexOf(keyword);
    if (idx !== -1) {
      console.log(`Found in ${f} at index ${idx}:`);
      // Print context around match
      const start = Math.max(0, idx - 200);
      const end = Math.min(text.length, idx + 1500);
      console.log(text.slice(start, end));
    }
  }
}

searchInChunks('PawTrailCanvas');
searchInChunks('HeroLineup');
searchInChunks('tp-curtain');
searchInChunks('pup-stop');
searchInChunks('tp-door');
