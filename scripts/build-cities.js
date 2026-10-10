// scripts/build-cities.js
// Pre-renders static HTML for all 606 city landing pages into dist/
// Ensures that static assets served by Cloudflare Assets or Eleventy match the latest design system.

const fs = require('fs');
const path = require('path');
const { renderCityHtml } = require('../src/edgeRenderer.js');
const cities = require('../src/_data/cities.json');

const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log(`Pre-rendering static HTML for ${cities.length} cities...`);
const startTime = Date.now();
let count = 0;

for (const city of cities) {
  const html = renderCityHtml(city.stateSlug, city.slug);
  if (html) {
    const cityDir = path.join(distDir, city.stateSlug, city.slug);
    fs.mkdirSync(cityDir, { recursive: true });
    fs.writeFileSync(path.join(cityDir, 'index.html'), html, 'utf8');
    count++;
  }
}

const elapsed = Date.now() - startTime;
console.log(`[SUCCESS] Pre-rendered ${count} city landing pages in dist/ in ${elapsed}ms!`);
