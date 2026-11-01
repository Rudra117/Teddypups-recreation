const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_happy-families.html', 'utf8');

// Find all img tags or items in the scrapbook gallery
const imgMatches = [...html.matchAll(/<img[^>]+alt="([^"]*)"[^>]+srcSet="([^"]*)"/g)];
console.log('Total images found on Happy Families:', imgMatches.length);
if (imgMatches.length > 0) {
  console.log('Sample image 1:', imgMatches[0][1]);
  console.log('Sample image 2:', imgMatches[1] ? imgMatches[1][1] : '');
}

// Find section headings and paragraphs
const headingMatches = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)];
console.log('Headings:');
headingMatches.forEach(h => console.log(' - ' + h[1].replace(/<[^>]+>/g, '').trim()));
