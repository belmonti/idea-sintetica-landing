const fs = require('fs');
const path = require('path');
const https = require('https');
const simpleIcons = require('simple-icons');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: {
          'User-Agent': 'IdeaSinteticaBrandBot/2.0 (https://ideasintetica.pro; admin@ideasintetica.pro)',
          'Accept': 'image/svg+xml,image/*,*/*'
        }
      };

      https.get(options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith('http')) {
            redirectUrl = new URL(redirectUrl, url).toString();
          }
          return fetchBuffer(redirectUrl).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    } catch (e) {
      reject(e);
    }
  });
}

function getSimpleIconColoredSvg(siObj, customColor) {
  const hex = customColor || ('#' + siObj.hex);
  // Simple Icons SVG uses fill="currentColor", we change it to hex
  let svg = siObj.svg;
  if (svg.includes('fill="currentColor"')) {
    svg = svg.replace('fill="currentColor"', `fill="${hex}"`);
  } else if (!svg.includes('fill=')) {
    svg = svg.replace('<svg ', `<svg fill="${hex}" `);
  }
  return svg;
}

async function run() {
  const audit = [];

  // =================== 12 TOOLS ===================

  // 1. Calendly (Simple Icons authentic vector)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siCalendly, '#006BFF');
    fs.writeFileSync('assets/tools/calendly.svg', svg);
    audit.push({ brand: 'Calendly', path: 'assets/tools/calendly.svg', source: 'Simple Icons (Official Calendly Glyph & Color #006BFF)', size: svg.length });
  }

  // 2. Zapier (Simple Icons authentic vector)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siZapier, '#FF4F00');
    fs.writeFileSync('assets/tools/zapier.svg', svg);
    audit.push({ brand: 'Zapier', path: 'assets/tools/zapier.svg', source: 'Simple Icons (Official Zapier Asterisk & Color #FF4F00)', size: svg.length });
  }

  // 3. HubSpot (Wikimedia Commons official vector)
  {
    try {
      const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg');
      fs.writeFileSync('assets/tools/hubspot.svg', buf);
      audit.push({ brand: 'HubSpot', path: 'assets/tools/hubspot.svg', source: 'Wikimedia Commons (Official HubSpot Vector)', size: buf.length });
    } catch (e) {
      const svg = getSimpleIconColoredSvg(simpleIcons.siHubspot, '#FF7A59');
      fs.writeFileSync('assets/tools/hubspot.svg', svg);
      audit.push({ brand: 'HubSpot', path: 'assets/tools/hubspot.svg', source: 'Simple Icons (Official HubSpot Sprocket Glyph)', size: svg.length });
    }
  }

  // 4. ActiveCampaign (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/0/01/ActiveCampaign_logo.svg');
    fs.writeFileSync('assets/tools/activecampaign.svg', buf);
    audit.push({ brand: 'ActiveCampaign', path: 'assets/tools/activecampaign.svg', source: 'Wikimedia Commons (Official ActiveCampaign Vector)', size: buf.length });
  }

  // 5. ClickFunnels (ClickFunnels Official CDN PNG)
  {
    const pngSize = fs.statSync('assets/tools/clickfunnels.png').size;
    audit.push({ brand: 'ClickFunnels', path: 'assets/tools/clickfunnels.png', source: 'ClickFunnels Official Brand CDN (High-res transparent PNG)', size: pngSize });
  }

  // 6. Typeform (Simple Icons authentic vector)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siTypeform, '#FFFFFF');
    fs.writeFileSync('assets/tools/typeform.svg', svg);
    audit.push({ brand: 'Typeform', path: 'assets/tools/typeform.svg', source: 'Simple Icons (Official Typeform Mark in Pure White)', size: svg.length });
  }

  // 7. ManyChat (ManyChat Official CDN SVG)
  {
    const buf = await fetchBuffer('https://mccdn.me/martech/next-lp/_next/static/media/logo-white-with-text.1m7t2iwvq-g0b.svg');
    fs.writeFileSync('assets/tools/manychat.svg', buf);
    audit.push({ brand: 'ManyChat', path: 'assets/tools/manychat.svg', source: 'ManyChat Official CDN (https://mccdn.me - Official Vector Logo)', size: buf.length });
  }

  // 8. Hootsuite (Simple Icons authentic Owly vector)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siHootsuite, '#FFFFFF');
    fs.writeFileSync('assets/tools/hootsuite.svg', svg);
    audit.push({ brand: 'Hootsuite', path: 'assets/tools/hootsuite.svg', source: 'Simple Icons (Official Hootsuite Owly Mark in Pure White)', size: svg.length });
  }

  // 9. Kajabi (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/c/cb/Kajabi_logo_%282026%29.svg');
    fs.writeFileSync('assets/tools/kajabi.svg', buf);
    audit.push({ brand: 'Kajabi', path: 'assets/tools/kajabi.svg', source: 'Wikimedia Commons (Official Kajabi Vector Logo)', size: buf.length });
  }

  // 10. Birdeye (Birdeye Official CDN PNG)
  {
    const pngSize = fs.statSync('assets/tools/birdeye.png').size;
    audit.push({ brand: 'Birdeye', path: 'assets/tools/birdeye.png', source: 'Birdeye Official CDN (High-res transparent PNG)', size: pngSize });
  }

  // 11. Salesforce (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg');
    fs.writeFileSync('assets/tools/salesforce.svg', buf);
    audit.push({ brand: 'Salesforce', path: 'assets/tools/salesforce.svg', source: 'Wikimedia Commons (Official Salesforce Cloud Vector)', size: buf.length });
  }

  // 12. Mailchimp (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/e/e4/MailChimp.svg');
    fs.writeFileSync('assets/tools/mailchimp.svg', buf);
    audit.push({ brand: 'Mailchimp', path: 'assets/tools/mailchimp.svg', source: 'Wikimedia Commons (Official Mailchimp Freddie Vector)', size: buf.length });
  }

  // =================== 14 INTEGRATIONS ===================

  // 13. WhatsApp (Wikimedia Commons official multi-color vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg');
    fs.writeFileSync('assets/integrations/whatsapp.svg', buf);
    audit.push({ brand: 'WhatsApp', path: 'assets/integrations/whatsapp.svg', source: 'Wikimedia Commons (Official Multi-Color WhatsApp Vector)', size: buf.length });
  }

  // 14. Stripe (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg');
    fs.writeFileSync('assets/integrations/stripe.svg', buf);
    audit.push({ brand: 'Stripe', path: 'assets/integrations/stripe.svg', source: 'Wikimedia Commons (Official Stripe Brand Vector)', size: buf.length });
  }

  // 15. Google (Wikimedia Commons official 4-color G logo)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg');
    fs.writeFileSync('assets/integrations/google.svg', buf);
    audit.push({ brand: 'Google', path: 'assets/integrations/google.svg', source: 'Wikimedia Commons (Official 4-Color Google G Vector)', size: buf.length });
  }

  // 16. Meta (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg');
    fs.writeFileSync('assets/integrations/meta.svg', buf);
    audit.push({ brand: 'Meta', path: 'assets/integrations/meta.svg', source: 'Wikimedia Commons (Official Meta Platforms Infinity Loop Vector)', size: buf.length });
  }

  // 17. Shopify (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg');
    fs.writeFileSync('assets/integrations/shopify.svg', buf);
    audit.push({ brand: 'Shopify', path: 'assets/integrations/shopify.svg', source: 'Wikimedia Commons (Official Shopify Bag & Wordmark Vector)', size: buf.length });
  }

  // 18. Slack (Wikimedia Commons official 4-color vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg');
    fs.writeFileSync('assets/integrations/slack.svg', buf);
    audit.push({ brand: 'Slack', path: 'assets/integrations/slack.svg', source: 'Wikimedia Commons (Official 4-Color Slack Octothorpe Vector)', size: buf.length });
  }

  // 19. TikTok (Authentic multi-color TikTok note vector)
  {
    // TikTok iconic cyan & pink offset logo
    const tiktokSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.33 2.27.93.17 1.94-.03 2.69-.64.67-.54 1.08-1.34 1.11-2.2.05-3.65.02-7.3.03-10.95.01-2.28 0-4.56.02-6.84z" fill="#25F4EE"/>
  <path d="M11.6.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.33 2.27.93.17 1.94-.03 2.69-.64.67-.54 1.08-1.34 1.11-2.2.05-3.65.02-7.3.03-10.95.01-2.28 0-4.56.02-6.84z" fill="#FE2C55" style="mix-blend-mode: screen;"/>
  <path d="M12.06.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.14 1.18 2.07 2.33 2.27.93.17 1.94-.03 2.69-.64.67-.54 1.08-1.34 1.11-2.2.05-3.65.02-7.3.03-10.95.01-2.28 0-4.56.02-6.84z" fill="#FFFFFF"/>
</svg>`;
    fs.writeFileSync('assets/integrations/tiktok.svg', tiktokSvg);
    audit.push({ brand: 'TikTok', path: 'assets/integrations/tiktok.svg', source: 'Official TikTok Brand Colors (Cyan #25F4EE, Magenta #FE2C55 & White Note Vector)', size: tiktokSvg.length });
  }

  // 20. LinkedIn (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg');
    fs.writeFileSync('assets/integrations/linkedin.svg', buf);
    audit.push({ brand: 'LinkedIn', path: 'assets/integrations/linkedin.svg', source: 'Wikimedia Commons (Official LinkedIn Rounded Badge & In Vector)', size: buf.length });
  }

  // 21. Zoom (Simple Icons authentic vector in Zoom Blue #0B5CFF)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siZoom, '#0B5CFF');
    fs.writeFileSync('assets/integrations/zoom.svg', svg);
    audit.push({ brand: 'Zoom', path: 'assets/integrations/zoom.svg', source: 'Simple Icons (Official Zoom Video Camera Glyph & Color #0B5CFF)', size: svg.length });
  }

  // 22. QuickBooks (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/7/79/Intuit_QuickBooks_logo.svg');
    fs.writeFileSync('assets/integrations/quickbooks.svg', buf);
    audit.push({ brand: 'QuickBooks', path: 'assets/integrations/quickbooks.svg', source: 'Wikimedia Commons (Official Intuit QuickBooks Vector)', size: buf.length });
  }

  // 23. Twilio (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg');
    fs.writeFileSync('assets/integrations/twilio.svg', buf);
    audit.push({ brand: 'Twilio', path: 'assets/integrations/twilio.svg', source: 'Wikimedia Commons (Official Twilio Red Roundel Vector)', size: buf.length });
  }

  // 24. Mailgun (Simple Icons authentic vector in Mailgun Red #F06B66)
  {
    const svg = getSimpleIconColoredSvg(simpleIcons.siMailgun, '#F06B66');
    fs.writeFileSync('assets/integrations/mailgun.svg', svg);
    audit.push({ brand: 'Mailgun', path: 'assets/integrations/mailgun.svg', source: 'Simple Icons (Official Mailgun Rocket Glyph & Color #F06B66)', size: svg.length });
  }

  // 25. WordPress (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg');
    fs.writeFileSync('assets/integrations/wordpress.svg', buf);
    audit.push({ brand: 'WordPress', path: 'assets/integrations/wordpress.svg', source: 'Wikimedia Commons (Official WordPress Blue Roundel Vector)', size: buf.length });
  }

  // 26. PayPal (Wikimedia Commons official vector)
  {
    const buf = await fetchBuffer('https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg');
    fs.writeFileSync('assets/integrations/paypal.svg', buf);
    audit.push({ brand: 'PayPal', path: 'assets/integrations/paypal.svg', source: 'Wikimedia Commons (Official PayPal Double-P Vector)', size: buf.length });
  }

  console.log('\n=== LOGO AUDIT REPORT (' + audit.length + ' / 26) ===');
  console.table(audit);
  fs.writeFileSync('logo_audit_results.json', JSON.stringify(audit, null, 2));
}

run().catch(console.error);
