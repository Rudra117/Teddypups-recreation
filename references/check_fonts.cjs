const fs = require('fs');
const css1 = fs.readFileSync('references/original_style_1.css', 'utf8');

const matches = css1.match(/[^{}]*font-plush[^{}]*\{[^}]*\}/gi) || [];
console.log('font-plush rules:', matches);

const scrawl = css1.match(/[^{}]*font-scrawl[^{}]*\{[^}]*\}/gi) || [];
console.log('font-scrawl rules:', scrawl);

const fontFaces = css1.match(/@font-face\s*\{[^}]*\}/gi) || [];
console.log('font-faces count:', fontFaces.length);
fontFaces.forEach((f, i) => console.log(`FontFace ${i}:`, f));
