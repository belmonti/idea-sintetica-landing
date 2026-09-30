const fs = require('fs');

const tools = fs.readdirSync('assets/tools');
const integrations = fs.readdirSync('assets/integrations');

console.log('=== ASSETS TOOLS ===');
tools.forEach(f => {
  const p = 'assets/tools/' + f;
  const stat = fs.statSync(p);
  let detail = '';
  if (f.endsWith('.svg')) {
    const text = fs.readFileSync(p, 'utf8');
    const hasWhite = text.includes('#FFFFFF') || text.includes('#fff') || text.includes('"white"');
    const fills = text.match(/fill="[^"]+"/g) || [];
    detail = `SVG viewBox: ${text.match(/viewBox="[^"]+"/)?.[0]} | fills: ${fills.slice(0, 3).join(', ')}`;
  } else {
    detail = `IMG (${stat.size} bytes)`;
  }
  console.log(`${f.padEnd(20)}: ${stat.size.toString().padStart(6)} bytes | ${detail}`);
});

console.log('\n=== ASSETS INTEGRATIONS ===');
integrations.forEach(f => {
  const p = 'assets/integrations/' + f;
  const stat = fs.statSync(p);
  let detail = '';
  if (f.endsWith('.svg')) {
    const text = fs.readFileSync(p, 'utf8');
    const fills = text.match(/fill="[^"]+"/g) || [];
    detail = `SVG viewBox: ${text.match(/viewBox="[^"]+"/)?.[0]} | fills: ${fills.slice(0, 3).join(', ')}`;
  } else {
    detail = `IMG (${stat.size} bytes)`;
  }
  console.log(`${f.padEnd(20)}: ${stat.size.toString().padStart(6)} bytes | ${detail}`);
});
