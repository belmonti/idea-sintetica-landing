const fs = require('fs');

const tools = [
  'calendly', 'zapier', 'hubspot', 'activecampaign',
  'clickfunnels', 'typeform', 'manychat', 'hootsuite',
  'kajabi', 'birdeye', 'salesforce', 'mailchimp'
];

const integrations = [
  'whatsapp', 'stripe', 'google', 'meta',
  'shopify', 'slack', 'tiktok', 'linkedin',
  'zoom', 'quickbooks', 'twilio', 'mailgun',
  'wordpress', 'paypal'
];

console.log('--- TOOLS ---');
for (const t of tools) {
  const svgPath = 'assets/tools/' + t + '.svg';
  const pngPath = 'assets/tools/' + t + '.png';
  const hasSvg = fs.existsSync(svgPath);
  const hasPng = fs.existsSync(pngPath);
  console.log(t + ':', {
    svg: hasSvg ? fs.statSync(svgPath).size + ' bytes' : 'NONE',
    png: hasPng ? fs.statSync(pngPath).size + ' bytes' : 'NONE'
  });
  if (hasSvg) {
    const content = fs.readFileSync(svgPath, 'utf8').trim().slice(0, 100);
    console.log('   SVG sample:', content);
  }
}

console.log('\n--- INTEGRATIONS ---');
for (const i of integrations) {
  const svgPath = 'assets/integrations/' + i + '.svg';
  const pngPath = 'assets/integrations/' + i + '.png';
  const hasSvg = fs.existsSync(svgPath);
  const hasPng = fs.existsSync(pngPath);
  console.log(i + ':', {
    svg: hasSvg ? fs.statSync(svgPath).size + ' bytes' : 'NONE',
    png: hasPng ? fs.statSync(pngPath).size + ' bytes' : 'NONE'
  });
  if (hasSvg) {
    const content = fs.readFileSync(svgPath, 'utf8').trim().slice(0, 100);
    console.log('   SVG sample:', content);
  }
}
