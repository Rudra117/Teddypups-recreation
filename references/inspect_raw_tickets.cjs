const fs = require('fs');

const ghHtml = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_gone-home.html', 'utf8');

const regex = /<li\s+[^>]*class="[^"]*tp-ticket[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let m;
let count = 0;

while ((m = regex.exec(ghHtml)) !== null) {
  count++;
  const inner = m[1];

  const hrefMatch = inner.match(/href="(\/puppies\/[^"]+)"/);
  const href = hrefMatch ? hrefMatch[1] : '';

  const nameMatch = inner.match(/class="[^"]*tp-ticket__name[^"]*">([^<]+)<\/span>/);
  const name = nameMatch ? nameMatch[1].trim() : '';

  const metaMatch = inner.match(/class="[^"]*tp-ticket__meta[^"]*">([^<]+)<\/span>/);
  const meta = metaMatch ? metaMatch[1].trim() : '';

  const altMatch = inner.match(/alt="([^"]*)"/);
  const alt = altMatch ? altMatch[1] : '';

  console.log(`[Ticket #${count}] href: ${href} | name: "${name}" | meta: "${meta}" | alt: "${alt}"`);
}
