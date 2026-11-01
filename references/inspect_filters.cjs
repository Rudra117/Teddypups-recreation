const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');

const idx = html.indexOf('tp-filters') !== -1 ? html.indexOf('tp-filters') : html.indexOf('Everywhere');
console.log('Filter area snippet:');
console.log(html.substring(idx - 100, idx + 2000));
