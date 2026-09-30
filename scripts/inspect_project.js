const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

const toolsInHtml = Array.from(new Set(content.match(/assets\/tools\/[^"'\s>]+/g) || []));
const integrationsInHtml = Array.from(new Set(content.match(/assets\/integrations\/[^"'\s>]+/g) || []));

console.log('Tools in HTML (' + toolsInHtml.length + '):');
toolsInHtml.forEach(t => console.log('  ' + t));

console.log('\nIntegrations in HTML (' + integrationsInHtml.length + '):');
integrationsInHtml.forEach(i => console.log('  ' + i));
