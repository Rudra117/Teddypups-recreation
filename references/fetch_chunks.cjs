const fs = require('fs');
const path = require('path');

const chunks = [
  '/_next/static/chunks/1jb_fwgazaoni.js',
  '/_next/static/chunks/3oou8raeyuv9d.js',
  '/_next/static/chunks/3umdxiosfhr4i.js',
  '/_next/static/chunks/2pig6dvmm0b07.js',
  '/_next/static/chunks/13ebhwe8d-mme.js',
  '/_next/static/chunks/turbopack-2c3mg3r-05n1w.js',
  '/_next/static/chunks/2-rfe7f68bjl5.js',
  '/_next/static/chunks/1llon2cx5n3pm.js',
  '/_next/static/chunks/3n_i7_kd-icfu.js',
  '/_next/static/chunks/31atla-pvue69.js',
  '/_next/static/chunks/14uqkrigpurrq.js',
  '/_next/static/chunks/177ya708_1zuj.js',
  '/_next/static/chunks/04u0_mknmf3rz.js',
  '/_next/static/chunks/3gnj9-_12x8lt.js',
  '/_next/static/chunks/1wa3jfz4v5w2v.js',
  '/_next/static/chunks/1zehnmtvp861v.js',
  '/_next/static/chunks/0-as3adn0ic8o.js',
  '/_next/static/chunks/0cz1d0mv5g_q7.js'
];

const outDir = 'C:\\Users\\Rudra Panchal\\Documents\\Projects\\teddypups-recreation\\references\\chunks';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  for (const c of chunks) {
    const filename = path.basename(c);
    const dest = path.join(outDir, filename);
    if (fs.existsSync(dest)) continue;
    const url = 'https://puppy.instabizweb.com' + c;
    try {
      console.log('Fetching', url);
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        fs.writeFileSync(dest, text);
        console.log('Saved', filename, text.length);
      } else {
        console.log('Failed', res.status);
      }
    } catch (e) {
      console.log('Error', e.message);
    }
  }
}

run();
