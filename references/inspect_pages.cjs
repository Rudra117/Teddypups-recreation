const fs = require('fs');

const hiw = fs.readFileSync('references/live_how_it_works.html', 'utf8');
const hf = fs.readFileSync('references/live_happy_families.html', 'utf8');

console.log('=== HOW IT WORKS INTRO ===');
const hiwMain = hiw.indexOf('<main');
console.log(hiw.substring(hiwMain, hiwMain + 2500));

console.log('\n=== HAPPY FAMILIES SCRAPBOOK ===');
const hfMain = hf.indexOf('<main');
console.log(hf.substring(hfMain, hfMain + 2500));
