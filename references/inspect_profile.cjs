const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_profile_max.html', 'utf8');

const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Profile headings:');
headings.forEach(h => console.log(' - ' + h));

// Search for previous / next links
const navMatches = [...html.matchAll(/<a[^>]*href="(\/puppies\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
console.log('Profile links to other puppies:');
navMatches.forEach(m => {
  if (m[1].startsWith('/puppies/') && !m[1].includes('puppies?')) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text) console.log(` - Link: ${m[1]} -> "${text}"`);
  }
});
