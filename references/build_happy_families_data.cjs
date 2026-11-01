const fs = require('fs');

const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_happy-families.html', 'utf8');

// Match each polaroid item:
// <li class="tp-wall__item" ...><button type="button" class="tp-wall__print" aria-label="Open photo 1 of 64"><span class="tp-polaroid" style="--tilt:-2.2deg;--tape:#f6d79a;--i:0"><span aria-hidden="true" class="tp-tape tp-tape--center"></span><span class="tp-polaroid__photo"><img ... srcSet="..." ... /></span></span></button></li>
const itemRegex = /<li\s+[^>]*class="[^"]*tp-wall__item[^"]*"[^>]*>([\s\S]*?)<\/li>/g;
let m;
const families = [];

while ((m = itemRegex.exec(html)) !== null) {
  const inner = m[1];
  
  const labelMatch = inner.match(/aria-label="Open photo (\d+) of (\d+)"/);
  const index = labelMatch ? parseInt(labelMatch[1], 10) : families.length + 1;
  const total = labelMatch ? parseInt(labelMatch[2], 10) : 64;

  const styleMatch = inner.match(/style="([^"]*)"/);
  const style = styleMatch ? styleMatch[1] : '';

  const tiltMatch = style.match(/--tilt:([^;]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

  const tapeMatch = style.match(/--tape:([^;]+)/);
  const tape = tapeMatch ? tapeMatch[1].trim() : '#f6d79a';

  const imgMatch = inner.match(/srcSet="([^"]+)"/) || inner.match(/src="([^"]+)"/);
  let image = '';
  if (imgMatch) {
    const src = imgMatch[1];
    const urlParam = src.match(/url=([^&]+)/);
    if (urlParam) {
      image = decodeURIComponent(urlParam[1]);
    } else {
      image = src.split(' ')[0];
    }
  }

  // Extract alt text
  const altMatch = inner.match(/alt="([^"]*)"/);
  const caption = altMatch && altMatch[1] ? altMatch[1] : `A happy TeddyPups family with their new puppy (Moment ${index})`;

  families.push({
    id: `family-${index}`,
    index,
    caption,
    tilt,
    tape,
    image: image ? `https://puppy.instabizweb.com${image}` : '',
    rawImage: image
  });
}

console.log(`Extracted ${families.length} happy family moments.`);
fs.writeFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_families.json', JSON.stringify(families, null, 2));
