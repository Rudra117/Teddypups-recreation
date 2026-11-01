const fs = require('fs');

function extractPuppies(html, isGoneHome = false) {
  // Match <a> tag with class="tp-sketch" or containing href="/puppies/..."
  const linkRegex = /<a\s+[^>]*href="(\/puppies\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let match;
  const list = [];
  const seen = new Set();
  
  while ((match = linkRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const link = match[1];
    const inner = match[2];

    if (seen.has(link)) continue;
    seen.add(link);

    // Extract aria-label
    const labelMatch = fullTag.match(/aria-label="([^"]+)"/);
    const label = labelMatch ? labelMatch[1] : '';

    // Extract style wash
    const washMatch = fullTag.match(/--wash:([^;"]+)/);
    const wash = washMatch ? washMatch[1].trim() : '#f2be6b';

    // Extract tilt
    const tiltMatch = fullTag.match(/--tilt:([^;"]+)/);
    const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

    // Extract img src
    const imgMatch = inner.match(/src="([^"]+)"/);
    const imgSrc = imgMatch ? decodeURIComponent(imgMatch[1]) : '';

    list.push({ link, label, wash, tilt, imgSrc, isGoneHome });
  }
  return list;
}

const p1 = extractPuppies(fs.readFileSync('references/live_puppies.html', 'utf8'), false);
const p2 = extractPuppies(fs.readFileSync('references/live_gone-home.html', 'utf8'), true);

console.log('Puppies extracted:', p1.length, 'Gone Home extracted:', p2.length);
if (p1.length > 0) console.log('Sample Puppy:', p1[0]);
if (p2.length > 0) console.log('Sample Gone Home:', p2[0]);

fs.writeFileSync('references/extracted_puppies.json', JSON.stringify({ available: p1, goneHome: p2 }, null, 2));
