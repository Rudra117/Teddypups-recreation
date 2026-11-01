const fs = require('fs');
const html = fs.readFileSync('references/live_homepage.html', 'utf8');

const matches = html.match(/\/(_next\/static\/chunks\/[a-zA-Z0-9_-]+\.js)/g) || [];
console.log('Unique chunk URLs:', [...new Set(matches)]);
