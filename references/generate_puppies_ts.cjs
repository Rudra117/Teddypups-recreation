const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_puppies.json', 'utf8'));

const available = data.available;
const goneHome = data.goneHome;

const puppies = [];

// Available puppies
available.forEach((p, idx) => {
  puppies.push({
    id: p.id,
    slug: p.slug,
    name: p.name,
    breed: p.breed,
    gender: p.gender,
    age: p.age || '3 months',
    status: 'available',
    origin: p.origin,
    washColor: p.wash || '#f2be6b',
    tilt: p.tilt || '0deg',
    image: p.image || '/brand/logo.png',
    galleryImages: [
      p.image || '/brand/logo.png',
      // Add profile gallery if available or reuse
    ],
    description: `A sweet, gentle and loving ${p.breed} puppy ready for a warm home. Raised with utmost care in ethical conditions, vaccinated, microchipped and certified healthy by licensed veterinarians.`,
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    vetChecked: true,
    healthCertificate: true
  });
});

// Gone home puppies
goneHome.forEach((p, idx) => {
  puppies.push({
    id: p.id,
    slug: p.slug,
    name: p.name,
    breed: p.breed,
    gender: p.gender,
    age: 'Adopted',
    status: 'gone_home',
    origin: p.origin || 'Imported',
    washColor: p.wash || '#f2be6b',
    tilt: p.tilt || '0deg',
    image: p.image || '/brand/logo.png',
    galleryImages: [
      p.image || '/brand/logo.png'
    ],
    description: `${p.name} has safely arrived and joined a loving family in the UAE!`,
    destination: p.destination || 'Loving Family in UAE',
    route: 'TeddyPups → home ♥',
    vaccinated: true,
    dewormed: true,
    microchipped: true,
    vetChecked: true,
    healthCertificate: true
  });
});

const tsContent = `import { Puppy } from '../types/puppy';

export const puppies: Puppy[] = ${JSON.stringify(puppies, null, 2)};

export const availablePuppies = puppies.filter(p => p.status === 'available');
export const goneHomePuppies = puppies.filter(p => p.status === 'gone_home');

export const getPuppyBySlug = (slug: string): Puppy | undefined => {
  return puppies.find(p => p.slug === slug || p.id === slug);
};
`;

fs.writeFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/src/data/puppies.ts', tsContent, 'utf8');
console.log(`Generated src/data/puppies.ts with ${puppies.length} puppies total.`);
