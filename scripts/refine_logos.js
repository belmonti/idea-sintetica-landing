const fs = require('fs');

// 1. Typeform: fill to official charcoal #262627
{
  let tf = fs.readFileSync('assets/tools/typeform.svg', 'utf8');
  tf = tf.replace(/fill="#FFFFFF"/g, 'fill="#262627"').replace(/fill="#fff"/g, 'fill="#262627"');
  fs.writeFileSync('assets/tools/typeform.svg', tf);
  console.log('Updated typeform.svg');
}

// 2. Hootsuite: fill to official charcoal #14191E
{
  let hs = fs.readFileSync('assets/tools/hootsuite.svg', 'utf8');
  hs = hs.replace(/fill="#FFFFFF"/g, 'fill="#14191E"').replace(/fill="#fff"/g, 'fill="#14191E"');
  fs.writeFileSync('assets/tools/hootsuite.svg', hs);
  console.log('Updated hootsuite.svg');
}

// 3. ManyChat: fill white to #111827
{
  let mc = fs.readFileSync('assets/tools/manychat.svg', 'utf8');
  mc = mc.replace(/fill="white"/g, 'fill="#111827"');
  fs.writeFileSync('assets/tools/manychat.svg', mc);
  console.log('Updated manychat.svg');
}

// 4. HubSpot: add viewBox="0 0 106 31"
{
  let hs = fs.readFileSync('assets/tools/hubspot.svg', 'utf8');
  if (!hs.includes('viewBox')) {
    hs = hs.replace('<svg ', '<svg viewBox="0 0 106 31" ');
    fs.writeFileSync('assets/tools/hubspot.svg', hs);
    console.log('Updated hubspot.svg viewBox');
  }
}

// 5. Slack: add viewBox="0 0 127 127"
{
  let sl = fs.readFileSync('assets/integrations/slack.svg', 'utf8');
  if (!sl.includes('viewBox')) {
    sl = sl.replace('<svg ', '<svg viewBox="0 0 127 127" ');
    fs.writeFileSync('assets/integrations/slack.svg', sl);
    console.log('Updated slack.svg viewBox');
  }
}

// 6. Meta: add viewBox="0 0 948 191"
{
  let mt = fs.readFileSync('assets/integrations/meta.svg', 'utf8');
  if (!mt.includes('viewBox')) {
    mt = mt.replace('<svg ', '<svg viewBox="0 0 948 191" ');
    fs.writeFileSync('assets/integrations/meta.svg', mt);
    console.log('Updated meta.svg viewBox');
  }
}

// 7. ActiveCampaign: sanitize width/height
{
  let ac = fs.readFileSync('assets/tools/activecampaign.svg', 'utf8');
  ac = ac.replace(/width="137\.28685mm"/, 'width="100%"').replace(/height="14\.83779mm"/, 'height="100%"');
  fs.writeFileSync('assets/tools/activecampaign.svg', ac);
  console.log('Updated activecampaign.svg dimensions');
}

console.log('All logo vector refinements completed.');
