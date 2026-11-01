const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_contact.html', 'utf8');

const idx = html.indexOf('<form') !== -1 ? html.indexOf('<form') : html.indexOf('Dear Teddy');
console.log('Form or letter at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 3500));
}
