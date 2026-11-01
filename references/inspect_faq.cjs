const fs = require('fs');
const html = fs.readFileSync('C:/Users/Rudra Panchal/Documents/Projects/teddypups-recreation/references/live_faq.html', 'utf8');

// Find all question buttons or summaries
const questions = [];
const qRegex = /<button[^>]*class="[^"]*tp-faq__trigger[^"]*"[^>]*>([\s\S]*?)<\/button>/g;
let match;
while ((match = qRegex.exec(html)) !== null) {
  questions.push(match[1].replace(/<[^>]+>/g, '').trim());
}

console.log('FAQ questions found (' + questions.length + '):');
questions.forEach((q, i) => console.log(`${i + 1}. ${q}`));

// Let's also look for accordion items or answers
const items = [...html.matchAll(/<details[^>]*class="[^"]*tp-faq__item[^"]*"[^>]*>([\s\S]*?)<\/details>/g)];
console.log('Details items count:', items.length);
if (items.length === 0) {
  // Check other structure
  const details2 = [...html.matchAll(/<li[^>]*class="[^"]*tp-faq[^"]*"[^>]*>([\s\S]*?)<\/li>/g)];
  console.log('LI items count:', details2.length);
  if (details2.length > 0) {
    console.log('Sample FAQ item:');
    console.log(details2[0][0].substring(0, 800));
  }
}
