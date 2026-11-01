const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_contact.html', 'utf8');

const idx = html.indexOf('Korean Teacup Pomeranian (boy)');
console.log(html.substring(idx + 100, idx + 1500));
