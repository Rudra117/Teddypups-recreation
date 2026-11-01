const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_faq.html', 'utf8');

const idx = html.indexOf('Questions &amp; answers') !== -1 ? html.indexOf('Questions &amp; answers') : html.indexOf('Questions');
console.log('Index:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 2500));
}
