const fs = require('fs');

const html = fs.readFileSync('references/live_homepage.html', 'utf8');

// Search for hero markup
const heroMatch = html.match(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>([\s\S]*?)<\/section>/i) ||
                  html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

if (heroMatch) {
  console.log('Hero / Main start snippet:');
  console.log(heroMatch[0].slice(0, 2500));
} else {
  console.log('No hero tag directly found; scanning section tags:');
  const sections = html.match(/<section[^>]*>/gi) || [];
  console.log('Sections in homepage:', sections);
}
