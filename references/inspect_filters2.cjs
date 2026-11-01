const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');

const idx = html.indexOf('>Everywhere<') !== -1 ? html.indexOf('>Everywhere<') : html.indexOf('Everywhere');
console.log('Everywhere at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 400, idx + 1600));
}
