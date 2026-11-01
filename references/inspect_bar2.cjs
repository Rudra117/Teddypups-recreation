const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_homepage.html', 'utf8');

const idx = html.indexOf('</footer>');
console.log('After footer:');
console.log(html.substring(idx, idx + 2500));
