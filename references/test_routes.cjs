const http = require('http');

const routes = [
  '/',
  '/puppies',
  '/puppies/maltipoo-max-male',
  '/happy-families',
  '/how-it-works',
  '/faq',
  '/contact',
  '/gone-home'
];

async function checkRoute(route) {
  const url = `http://127.0.0.1:4173${route}`;
  const res = await fetch(url);
  const text = await res.text();
  const ok = res.status === 200 && text.includes('id="root"') && text.includes('index-qGU7ZvNh.js');
  console.log(`Route [${route}]: status=${res.status}, hasRoot=${text.includes('id="root"')}, byteLength=${text.length}, verified=${ok}`);
  return ok;
}

async function main() {
  console.log('Testing TeddyPups recreated routes on preview server (127.0.0.1:4173)...');
  let allOk = true;
  for (const r of routes) {
    const passed = await checkRoute(r);
    if (!passed) allOk = false;
  }
  console.log('\nAll routes successfully served with SPA index and React bundle:', allOk);
}

main().catch(console.error);
