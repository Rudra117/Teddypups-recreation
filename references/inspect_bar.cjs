const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_homepage.html', 'utf8');

const idx = html.indexOf('tp-bar') !== -1 ? html.indexOf('tp-bar') : html.indexOf('sticky');
console.log('Sticky bar index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1500));
}
