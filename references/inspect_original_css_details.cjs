const fs = require('fs');

const css1 = fs.readFileSync('references/original_style_1.css', 'utf8');
const css2 = fs.readFileSync('references/original_style_2.css', 'utf8');
const allCss = css1 + '\n' + css2;

function extractRules(pattern) {
  const regex = new RegExp(`([^}{]*${pattern}[^}{]*\\{[^}]*\\})`, 'gi');
  const matches = allCss.match(regex) || [];
  return matches;
}

console.log('=== CURTAIN RULES ===');
console.log(extractRules('tp-curtain').join('\n\n'));

console.log('=== DOOR RULES ===');
console.log(extractRules('door').slice(0, 15).join('\n\n'));

console.log('=== PAW / CURSOR / TRAIL RULES ===');
console.log(extractRules('paw|cursor|trail').slice(0, 15).join('\n\n'));
