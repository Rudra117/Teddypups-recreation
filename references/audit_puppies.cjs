const fs = require('fs');

const { puppies } = require('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_puppies.json');
const data = JSON.parse(fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_puppies.json', 'utf8'));

console.log('--- AVAILABLE PUPPIES AUDIT ---');
data.available.forEach((p, idx) => {
  console.log(`[#${idx+1}] slug: "${p.slug}", name: "${p.name}", breed: "${p.breed}", gender: "${p.gender}", age: "${p.age}", origin: "${p.origin}"`);
});

console.log('\n--- GONE HOME PUPPIES AUDIT ---');
data.goneHome.forEach((p, idx) => {
  console.log(`[#${idx+1}] slug: "${p.slug}", name: "${p.name}", breed: "${p.breed}", gender: "${p.gender}", origin: "${p.origin}", dest: "${p.destination}"`);
});
