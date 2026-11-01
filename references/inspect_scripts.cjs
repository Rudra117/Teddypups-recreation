const fs = require('fs');
const html = fs.readFileSync('references/live_homepage.html', 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Total scripts found:', scripts.length);

scripts.forEach((s, idx) => {
  const isInline = !s.includes('src=');
  const len = s.length;
  console.log(`Script ${idx}: inline=${isInline}, len=${len}`);
  if (isInline && (s.includes('paw') || s.includes('cursor') || s.includes('curtain') || s.includes('pup') || s.includes('walker'))) {
    console.log(`=== INLINE SCRIPT ${idx} WITH RELEVANT KEYWORDS ===`);
    console.log(s.slice(0, 1000));
  }
});
