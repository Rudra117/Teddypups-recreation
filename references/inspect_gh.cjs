const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_gone-home.html', 'utf8');
const idx = html.indexOf('/puppies/pomeranian-ace-boy');
const afterImg = html.indexOf('</span>', idx + 100);
console.log(html.substring(afterImg, afterImg + 1500));
