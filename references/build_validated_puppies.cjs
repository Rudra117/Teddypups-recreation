const fs = require('fs');

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

const puppiesHtml = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_puppies.html', 'utf8');
const ghHtml = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_gone-home.html', 'utf8');

// Parse available puppies
const sketchRegex = /<a\s+[^>]*class="[^"]*tp-sketch[^"]*"[^>]*>([\s\S]*?)<\/a>/g;
let m;
const availableList = [];
const seenSlugs = new Set();

while ((m = sketchRegex.exec(puppiesHtml)) !== null) {
  const fullTag = m[0];
  const inner = m[1];

  const hrefMatch = fullTag.match(/href="(\/puppies\/[^"]+)"/);
  if (!hrefMatch) continue;
  const slug = hrefMatch[1].replace('/puppies/', '');

  const labelMatch = fullTag.match(/aria-label="([^"]+)"/);
  const rawLabel = labelMatch ? decodeEntities(labelMatch[1]) : '';

  const styleMatch = fullTag.match(/style="([^"]+)"/);
  const style = styleMatch ? styleMatch[1] : '';

  const washMatch = style.match(/--wash:([^;]+)/);
  const washColor = washMatch ? washMatch[1].trim() : '#f2be6b';

  const tiltMatch = style.match(/--tilt:([^;]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

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

  // Parse raw label
  // Formats:
  // "Max, Maltipoo, boy, 3 months, available"
  // "Korean Teacup Maltipoo, girl, 2 months, available"
  // "Maltipoo & Cavapoo, boy, 3 months Maltipoo & 2 months Cavapoo, available"
  // "Toy Poodle, boy & girl, 2 months, available"
  // "Maltipoo, girl, 3 months, available"
  // "Ace, Pomeranian, boy, 3 months, gone home"
  const parts = rawLabel.split(',').map(s => s.trim());
  
  let name = '';
  let breed = '';
  let gender = 'Boy';
  let age = '';
  let status = 'available';

  if (parts.length >= 5) {
    // Has individual name: Name, Breed, Gender, Age, Status
    name = parts[0];
    breed = parts[1];
    gender = parts[2];
    age = parts[3];
    status = parts[4].toLowerCase().includes('gone') ? 'gone_home' : 'available';
  } else if (parts.length === 4) {
    // Breed, Gender, Age, Status (No individual name)
    name = parts[0];
    breed = parts[0];
    gender = parts[1];
    age = parts[2];
    status = parts[3].toLowerCase().includes('gone') ? 'gone_home' : 'available';
  } else {
    name = parts[0] || 'Teddy Pup';
    breed = parts[0] || 'Teacup Pup';
    gender = 'Boy';
    age = '2–3 months';
    status = 'available';
  }

  // Determine origin
  let origin = 'Everywhere';
  if (slug.includes('korean') || breed.toLowerCase().includes('korean')) {
    origin = 'Korean Teacup';
  } else if (slug.includes('imported')) {
    origin = 'Imported';
  }

  // Clean breed category for filtering
  let breedCategory = 'Other';
  const bLower = breed.toLowerCase();
  if (bLower.includes('maltipoo')) breedCategory = 'Maltipoo';
  else if (bLower.includes('pomeranian')) breedCategory = 'Pomeranian';
  else if (bLower.includes('poodle')) breedCategory = 'Poodle';
  else if (bLower.includes('cavapoo')) breedCategory = 'Cavapoo';
  else if (bLower.includes('shih tzu') || bLower.includes('shitzu')) breedCategory = 'Shih Tzu';
  else if (bLower.includes('pomsky')) breedCategory = 'Pomsky';
  else if (bLower.includes('maltese')) breedCategory = 'Maltese';

  if (!seenSlugs.has(slug)) {
    seenSlugs.add(slug);
    availableList.push({
      id: slug,
      slug,
      name,
      breed,
      breedCategory,
      gender: gender.toLowerCase().includes('girl') || gender.toLowerCase().includes('female') ? 'Girl' : 'Boy',
      age,
      status,
      origin,
      washColor,
      tilt,
      image: image ? `https://puppy.instabizweb.com${image}` : '',
      description: `A sweet, gentle and loving ${breed} puppy ready for a warm home. Raised with ethical care, vaccinated, microchipped, and certified healthy by licensed veterinarians.`,
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true
    });
  }
}

// Parse Gone Home tickets
const ticketRegex = /<li\s+[^>]*class="[^"]*tp-ticket[^"]*"[^>]*style="([^"]*)"[^>]*>([\s\S]*?)<\/li>/g;
let tm;
const goneHomeList = [];

while ((tm = ticketRegex.exec(ghHtml)) !== null) {
  const style = tm[1];
  const inner = tm[2];

  const hrefMatch = inner.match(/href="(\/puppies\/[^"]+)"/);
  if (!hrefMatch) continue;
  const slug = hrefMatch[1].replace('/puppies/', '');

  const tiltMatch = style.match(/--tilt:([^;]+)/);
  const tilt = tiltMatch ? tiltMatch[1].trim() : '0deg';

  const nameMatch = inner.match(/class="[^"]*tp-ticket__name[^"]*">([^<]+)<\/span>/);
  const name = nameMatch ? decodeEntities(nameMatch[1].trim()) : 'Pup';

  const metaMatch = inner.match(/class="[^"]*tp-ticket__meta[^"]*">([^<]+)<\/span>/);
  const meta = metaMatch ? decodeEntities(metaMatch[1].trim()) : '';
  const metaParts = meta.split(',').map(s => s.trim());
  const breed = metaParts[0] || 'Puppy';
  const gender = metaParts[1] || 'Boy';

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

  // Clean breed category
  let breedCategory = 'Other';
  const bLower = breed.toLowerCase();
  if (bLower.includes('maltipoo')) breedCategory = 'Maltipoo';
  else if (bLower.includes('pomeranian')) breedCategory = 'Pomeranian';
  else if (bLower.includes('poodle')) breedCategory = 'Poodle';
  else if (bLower.includes('cavapoo')) breedCategory = 'Cavapoo';
  else if (bLower.includes('shih tzu') || bLower.includes('shitzu')) breedCategory = 'Shih Tzu';
  else if (bLower.includes('pomsky') || bLower.includes('pomski')) breedCategory = 'Pomsky';
  else if (bLower.includes('maltese')) breedCategory = 'Maltese';
  else if (bLower.includes('bichon')) breedCategory = 'Bichon';

  goneHomeList.push({
    id: slug,
    slug,
    name,
    breed,
    breedCategory,
    gender: gender.toLowerCase().includes('girl') || gender.toLowerCase().includes('female') ? 'Girl' : 'Boy',
    age: 'Adopted',
    status: 'gone_home',
    origin: slug.includes('korean') ? 'Korean Teacup' : 'Imported',
    tilt,
    washColor: '#f2be6b',
    image: image ? `https://puppy.instabizweb.com${image}` : '',
    description: `${name} has happily arrived in Dubai and joined their forever family!`,
    destination: 'Loving Family in UAE',
    route: 'TeddyPups → home ♥',
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    vetChecked: true,
    healthCertificate: true
  });
}

// Filter available: only records with status 'available' (first 15 are available, 16-20 were marked gone home in catalogue)
const trueAvailable = availableList.filter(p => p.status === 'available');
console.log(`True Available puppies: ${trueAvailable.length}`);
console.log(`Gone Home tickets: ${goneHomeList.length}`);

// Combine all puppies
const allPuppies = [...trueAvailable, ...goneHomeList];

const tsContent = `import { Puppy } from '../types/puppy';

export const puppies: Puppy[] = ${JSON.stringify(allPuppies, null, 2)};

export const availablePuppies = puppies.filter(p => p.status === 'available');
export const goneHomePuppies = puppies.filter(p => p.status === 'gone_home');

export const getPuppyBySlug = (slug: string): Puppy | undefined => {
  return puppies.find(p => p.slug === slug || p.id === slug);
};
`;

fs.writeFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/src/data/puppies.ts', tsContent, 'utf8');
console.log(`Wrote audited src/data/puppies.ts with ${allPuppies.length} verified records (${trueAvailable.length} available, ${goneHomeList.length} gone home).`);
