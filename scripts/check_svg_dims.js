const fs = require('fs');

const files = [
  ...fs.readdirSync('assets/tools').map(f => 'assets/tools/' + f),
  ...fs.readdirSync('assets/integrations').map(f => 'assets/integrations/' + f)
];

files.filter(f => f.endsWith('.svg')).forEach(p => {
  const content = fs.readFileSync(p, 'utf8');
  const rootMatch = content.match(/<svg[^>]*>/i);
  if (rootMatch) {
    const root = rootMatch[0];
    const hasViewBox = /viewBox=/i.test(root);
    const hasWidth = /width=/i.test(root);
    const hasHeight = /height=/i.test(root);
    console.log(p.padEnd(36), { viewBox: hasViewBox, width: hasWidth, height: hasHeight });
    if (!hasViewBox && (!hasWidth || !hasHeight)) {
      console.warn('  --> WARNING: Missing viewBox and dims in:', p);
    }
  }
});
