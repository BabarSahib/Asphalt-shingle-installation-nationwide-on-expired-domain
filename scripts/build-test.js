// scripts/build-test.js
// Automated CI & SEO Verification Suite for American Shingle Co.

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(distDir);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log(`\n==============================================`);
console.log(`Running Pre-Flight Audit on ${htmlFiles.length} HTML files...`);
console.log(`Total deployment files: ${allFiles.length}`);
console.log(`==============================================\n`);

let errors = 0;
let warnings = 0;

// Quality checks
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(distDir, file);

  // 1. Forbidden phrases check: 'free estimate' and 'paid estimate'
  if (/free\s+estimate/i.test(content)) {
    console.error(`[FAIL] ${relPath}: Contains forbidden phrase "free estimate"!`);
    errors++;
  }
  if (/paid\s+estimate/i.test(content)) {
    console.error(`[FAIL] ${relPath}: Contains forbidden phrase "paid estimate"!`);
    errors++;
  }

  // 2. Phone presence check
  if (!content.includes('(833) 348-0328') || !content.includes('tel:+18333480328')) {
    console.error(`[FAIL] ${relPath}: Missing phone number (833) 348-0328 or tel link!`);
    errors++;
  }

  // 3. Response time check
  if (!content.includes('30 to 90 minutes')) {
    console.error(`[FAIL] ${relPath}: Missing response time "30 to 90 minutes"!`);
    errors++;
  }

  // 4. H1 check
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match) {
    console.error(`[FAIL] ${relPath}: Missing <h1> tag!`);
    errors++;
  }

  // 5. Title tag check
  const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch) {
    console.error(`[FAIL] ${relPath}: Missing <title> tag!`);
    errors++;
  } else if (!titleMatch[1].includes('American Shingle Co.')) {
    console.warn(`[WARN] ${relPath}: Title does not contain brand name!`);
    warnings++;
  }

  // 6. Canonical link check
  if (!content.includes('rel="canonical"')) {
    console.error(`[FAIL] ${relPath}: Missing canonical tag!`);
    errors++;
  }

  // 7. JSON-LD schema check
  if (!content.includes('application/ld+json')) {
    console.warn(`[WARN] ${relPath}: Missing JSON-LD script!`);
    warnings++;
  }
});

// Check Cloudflare file limits
if (allFiles.length > 100000) {
  console.error(`[FAIL] File count (${allFiles.length}) exceeds Cloudflare limit (100,000)!`);
  errors++;
} else {
  console.log(`[PASS] File count (${allFiles.length}) is well within Cloudflare limits (< 100,000).`);
}

// Summary
console.log(`\n==============================================`);
if (errors === 0) {
  console.log(`ALL AUDIT CHECKS PASSED SUCCESSFULLY! (${warnings} warnings)`);
  console.log(`==============================================\n`);
  process.exit(0);
} else {
  console.error(`AUDIT FAILED with ${errors} errors and ${warnings} warnings.`);
  console.log(`==============================================\n`);
  process.exit(1);
}
