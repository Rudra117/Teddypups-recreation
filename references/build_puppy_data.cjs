const fs = require('fs');

const puppiesHtml = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');

const regex = /<a\s+[^>]*class="[^"]*tp-sketch[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
let m;
const availablePuppies = [];
const seenSlugs = new Set();

while ((m = regex.exec(puppiesHtml)) !== null) {
  const fullTag = m[0];
  const inner = m[1];

  const hrefMatch = fullTag.match(/href="(\/puppies\/[^"]+)"/);
  if (!hrefMatch) continue;
  const url = hrefMatch[1];
  const slug = url.replace('/puppies/', '');

  if (seenSlugs.has(slug)) continue;
  seenSlugs.add(slug);

  const labelMatch = fullTag.match(/aria-label="([^"]+)"/);
  const label = labelMatch ? labelMatch[1] : '';

  const styleMatch = fullTag.match(/style="([^"]+)"/);
  const style = styleMatch ? styleMatch[1] : '';

  // Parse label parts: Name, Breed, Gender, Age, Status
  const parts = label.split(',').map(s => s.trim());
  const name = parts[0] || 'Teddy Pup';
  const breed = parts[1] || 'Teacup Pup';
  const gender = parts[2] || 'Boy';
  const age = parts[3] || '2–3 months';

  // Extract wash color
  const washMatch = style.match(/--wash:([^;]+)/);
  const wash = washMatch ? washMatch[1].trim() : '#f2be6b';

  // Extract tilt
  const tiltMatch = style.match(/--tilt:([^;]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

  // Extract image
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

  // Determine origin based on slug or name
  let origin = 'Everywhere';
  if (slug.includes('korean') || breed.toLowerCase().includes('korean')) {
    origin = 'Korean Teacup';
  } else if (slug.includes('imported')) {
    origin = 'Imported';
  } else {
    origin = 'Everywhere';
  }

  availablePuppies.push({
    id: slug,
    slug,
    name,
    breed,
    gender: gender.toLowerCase().includes('girl') || gender.toLowerCase().includes('female') ? 'Girl' : 'Boy',
    age,
    status: 'available',
    origin,
    wash,
    tilt,
    image: image ? `https://puppy.instabizweb.com${image}` : '',
    rawImage: image,
    description: `A sweet, gentle and loving ${breed} puppy ready for a warm home. Raised with utmost care, vaccinated, microchipped and certified healthy.`
  });
}

console.log(`Extracted ${availablePuppies.length} available puppies.`);

// Re-read gone home puppies from extracted file or re-run
const prevData = JSON.parse(fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_puppies.json', 'utf8'));

fs.writeFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_puppies.json', JSON.stringify({ available: availablePuppies, goneHome: prevData.goneHome }, null, 2));
console.log('Saved to references/all_extracted_puppies.json');
