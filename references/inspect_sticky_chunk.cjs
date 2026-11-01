const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, 'chunks', '1wa3jfz4v5w2v.js'), 'utf8');

const idx = content.indexOf('scrollWidth-innerWidth');
console.log(content.substring(Math.max(0, idx - 500), idx + 1000));
