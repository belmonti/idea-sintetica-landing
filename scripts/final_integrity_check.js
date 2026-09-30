const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const forbiddenChecks = [
  { name: 'GoHighLevel', regex: /\bGoHighLevel\b/i },
  { name: 'GHL (standalone)', regex: /\bGHL\b/i },
  { name: 'LeadConnector', regex: /\bLeadConnector\b/i },
  { name: 'HighLevel', regex: /\bHighLevel\b/i },
  { name: 'Carlos Mora', regex: /Carlos Mora/i },
  { name: 'Elena Valdez', regex: /Elena Valdez/i },
  { name: 'Diego Herrera', regex: /Diego Herrera/i },
  { name: 'Carlos Méndez', regex: /Carlos M[eé]ndez/i },
  { name: 'Sofía Morales', regex: /Sof[ií]a Morales/i },
  { name: 'Nexus Scale', regex: /Nexus Scale/i },
  { name: 'E-Consulting', regex: /E-Consulting/i },
  { name: 'Soluciones B2B Integradas', regex: /Soluciones B2B Integradas/i },
  { name: 'Fake rating 4.9', regex: /4\.9/ },
  { name: 'Fake rating 5.0', regex: /5\.0/ },
  { name: 'Star rating glyphs', regex: /[★☆]/ }
];

console.log('=== FORBIDDEN / FABRICATED CLAIMS SCAN ===');
let foundAny = false;
forbiddenChecks.forEach(check => {
  const matches = html.match(check.regex);
  if (matches) {
    foundAny = true;
    console.error(`FOUND: "${check.name}" (${matches.length} occurrences)`);
  } else {
    console.log(`PASS: "${check.name}" not found`);
  }
});

console.log('\n=== ASSET REFERENCE VERIFICATION ===');
const imgMatches = html.match(/src="([^"]+)"/g) || [];
let missingAssets = 0;
imgMatches.forEach(m => {
  const src = m.replace('src="', '').replace('"', '');
  if (!src.startsWith('http') && !src.startsWith('data:')) {
    if (!fs.existsSync(src)) {
      missingAssets++;
      console.error(`MISSING ASSET: ${src}`);
    }
  }
});
if (missingAssets === 0) {
  console.log(`PASS: All ${imgMatches.length} local images exist on disk.`);
}

console.log('\nFinal Assessment:', (!foundAny && missingAssets === 0) ? '100% PERFECT & VERIFIED' : 'ISSUES DETECTED');
