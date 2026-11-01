const fs = require('fs');
const html = fs.readFileSync('references/live_homepage.html', 'utf8');

function extractTag(tag, className) {
  const re = new RegExp(`<${tag}[^>]*class="[^"]*${className}[^"]*"[\\s\\S]*?<\\/${tag}>`, 'i');
  const m = html.match(re);
  return m ? m[0] : null;
}

const hero = html.match(/<section[^>]*class="[^"]*tp-hero[^"]*"[\s\S]*?<\/section>/i);
if (hero) {
  console.log('=== HERO SECTION (length: ' + hero[0].length + ') ===');
  fs.writeFileSync('references/extracted_hero_section.html', hero[0]);
  console.log('Saved extracted_hero_section.html');
}

const meet = html.match(/<section[^>]*class="[^"]*tp-meet[^"]*"[\s\S]*?<\/section>/i);
if (meet) {
  console.log('=== MEET SECTION (length: ' + meet[0].length + ') ===');
  fs.writeFileSync('references/extracted_meet_section.html', meet[0]);
  console.log('Saved extracted_meet_section.html');
}

const curtain = html.match(/<div[^>]*class="[^"]*tp-curtain[^"]*"[\s\S]*?<\/div>\s*<\/div>/i);
if (curtain) {
  console.log('=== CURTAIN MARKUP FOUND ===');
  fs.writeFileSync('references/extracted_curtain.html', curtain[0]);
}
