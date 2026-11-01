const fs = require('fs');

const families = JSON.parse(fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/all_extracted_families.json', 'utf8'));

const tsContent = `import { HappyFamilyMoment } from '../types/puppy';

export const happyFamilyMoments: HappyFamilyMoment[] = ${JSON.stringify(families, null, 2)};
`;

fs.writeFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/src/data/happyFamilies.ts', tsContent, 'utf8');
console.log(`Generated src/data/happyFamilies.ts with ${families.length} moments.`);
