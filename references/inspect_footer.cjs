const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_homepage.html', 'utf8');

const idx = html.indexOf('<footer');
console.log('Footer starts at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 3500));
}
