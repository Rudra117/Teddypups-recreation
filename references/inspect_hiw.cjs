const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_how-it-works.html', 'utf8');

const headings = [...html.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('How it works headings:');
headings.forEach(h => console.log(' - ' + h));

// Search for four steps
const stepMatches = [...html.matchAll(/<li[^>]*class="[^"]*step[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
console.log('Step items count:', stepMatches.length);
if (stepMatches.length === 0) {
  // Let's search for "1" or "Step"
  const idx = html.indexOf('Two ways home');
  if (idx !== -1) {
    console.log(html.substring(idx - 100, idx + 2500));
  }
}
