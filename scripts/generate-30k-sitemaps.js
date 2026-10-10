// scripts/generate-30k-sitemaps.js
// Generates XML sitemaps for all 30,909 city pages (matching furnacerepairpros.com structure)

const fs = require('fs');
const path = require('path');
const site = require('../src/_data/site.json');
const locations = require('../src/_data/locations.json');

const distDir = path.join(__dirname, '../dist');
const sitemapsDir = path.join(distDir, 'sitemaps');

if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

const today = new Date().toISOString().split('T')[0];
let totalUrls = 0;
let mainCitiesXml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const [stateSlug, cityList] of Object.entries(locations)) {
  let stateXml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  cityList.forEach(city => {
    const loc = `${site.domain}/${stateSlug}/${city.slug}/`;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    stateXml += entry;
    mainCitiesXml += entry;
    totalUrls++;
  });

  stateXml += `</urlset>\n`;
  fs.writeFileSync(path.join(sitemapsDir, `${stateSlug}.xml`), stateXml, 'utf8');
}

mainCitiesXml += `</urlset>\n`;
fs.writeFileSync(path.join(distDir, 'sitemap-cities.xml'), mainCitiesXml, 'utf8');

console.log(`[SUCCESS] Generated 51 individual state sitemaps in dist/sitemaps/ and master dist/sitemap-cities.xml with ${totalUrls} total city URLs (lastmod: ${today})!`);
