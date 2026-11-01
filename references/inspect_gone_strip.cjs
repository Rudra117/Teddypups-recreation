const fs = require('fs');
const html = fs.readFileSync('references/live_puppies_direct.html', 'utf8');
const start = html.indexOf('tp-gone-strip');
console.log(html.substring(Math.max(0, start - 100), start + 3000));
