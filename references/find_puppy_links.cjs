const fs = require('fs');
const html = fs.readFileSync('references/live_puppies_direct.html', 'utf8');

const linkMatches = [...html.matchAll(/href=[\"']([^\"']+)[\"']/g)].map(m => m[1]);
const uniqueLinks = [...new Set(linkMatches)];

console.log('All unique hrefs on puppies page:');
uniqueLinks.forEach(l => console.log(' - ' + l));

// Also search for buttons or data-route or router pushes
const textMatches = html.match(/(?:Gone Home|Adoption Process|Adopted|Alumni|Reserved|Sold|Happy|Visit|Book|Past|Review|Stories|VIP|Care|Travel|Delivery|Korean|Teacup)[^<]{0,40}/gi);
console.log('\nRelevant keyword snippets:');
const uniqueText = [...new Set(textMatches)].slice(0, 30);
uniqueText.forEach(t => console.log(' * ' + t));
