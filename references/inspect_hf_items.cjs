const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_happy-families.html', 'utf8');

const idx = html.indexOf('A happy TeddyPups family');
if (idx !== -1) {
  console.log('Happy families gallery item:');
  console.log(html.substring(idx - 300, idx + 800));
}
