const fs = require('fs');

const puppiesHtml = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');

const regex = /<a\s+[^>]*class="[^"]*tp-sketch[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
let m;
let count = 0;

while ((m = regex.exec(puppiesHtml)) !== null) {
  count++;
  const fullTag = m[0];
  const inner = m[1];

  const hrefMatch = fullTag.match(/href="(\/puppies\/[^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '';

  const labelMatch = fullTag.match(/aria-label="([^"]+)"/);
  const label = labelMatch ? labelMatch[1] : '';

  // Extract caption/text inside inner if any
  const captionMatch = inner.match(/<span[^>]*class="[^"]*caption[^"]*"[^>]*>([\s\S]*?)<\/span>/i) ||
                       inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i) ||
                       inner.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const caption = captionMatch ? captionMatch[1].replace(/<[^>]+>/g, '').trim() : '';

  console.log(`[Raw #${count}] href: ${href} | aria-label: "${label}" | caption: "${caption}"`);
}
