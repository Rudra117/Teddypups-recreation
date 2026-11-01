const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');

const idx = html.indexOf('sketchbook');
console.log('sketchbook at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1500));
}
