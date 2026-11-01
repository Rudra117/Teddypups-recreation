const fs = require('fs');

const html = fs.readFileSync('references/live_homepage.html', 'utf8');
const css1 = fs.readFileSync('references/original_style_1.css', 'utf8');
const css2 = fs.readFileSync('references/original_style_2.css', 'utf8');

const combined = html + '\n' + css1 + '\n' + css2;

const keywords = ['loading', 'loader', 'preloader', 'transition', 'curtain', 'splash', 'door', 'carousel', 'paw', 'cursor', 'mascot', 'walking'];

keywords.forEach(kw => {
  const count = (combined.match(new RegExp(kw, 'gi')) || []).length;
  console.log(`${kw}: ${count} occurrences`);
});

// Let's print any class names or IDs matching loader, loading, transition, curtain
const matches = combined.match(/[.#][a-zA-Z0-9_-]*(?:loader|loading|splash|transition|curtain|preloader|walker|paw)[a-zA-Z0-9_-]*/gi) || [];
console.log('Unique matching selectors:', [...new Set(matches)].slice(0, 30));
