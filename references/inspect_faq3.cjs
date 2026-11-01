const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_faq.html', 'utf8');

const idx = html.indexOf('<main');
console.log('Main starts at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx, idx + 4000));
}
