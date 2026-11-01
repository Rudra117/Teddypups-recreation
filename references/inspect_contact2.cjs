const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_contact.html', 'utf8');

const idx = html.indexOf('tp-letterform__greeting');
console.log(html.substring(idx + 500, idx + 2000));
