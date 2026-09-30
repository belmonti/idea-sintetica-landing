const https = require('https');
const http = require('http');

function download(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/svg+xml,image/*,*/*'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = parsed.origin + redirectUrl;
        }
        return resolve(download(redirectUrl));
      }
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, length: body.length, body }));
    });
    req.on('error', reject);
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

const testList = [
  { name: 'Google', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg' },
  { name: 'Slack', url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg' },
  { name: 'WhatsApp', url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' },
  { name: 'Stripe', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
  { name: 'PayPal', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
  { name: 'Meta', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Shopify', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
  { name: 'TikTok', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/TikTok_logo.svg' },
  { name: 'LinkedIn', url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg' },
  { name: 'Zoom', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg' },
  { name: 'QuickBooks', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/QuickBooks_logo.svg' },
  { name: 'Twilio', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Twilio-logo-red.svg' },
  { name: 'WordPress', url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg' },
  { name: 'Salesforce', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg' },
  { name: 'Mailchimp', url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Mailchimp_Logo.svg' },
  { name: 'HubSpot', url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/HubSpot_Logo.svg' },
  { name: 'Zapier', url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Zapier_logo.svg' },
  { name: 'Calendly', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Calendly.svg' },
  { name: 'ActiveCampaign', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/ActiveCampaign_logo.svg' },
  { name: 'ClickFunnels', url: 'https://cdn.worldvectorlogo.com/logos/clickfunnels.svg' },
  { name: 'ManyChat', url: 'https://cdn.worldvectorlogo.com/logos/manychat.svg' },
  { name: 'Kajabi', url: 'https://cdn.worldvectorlogo.com/logos/kajabi.svg' },
  { name: 'Birdeye', url: 'https://cdn.worldvectorlogo.com/logos/birdeye.svg' }
];

async function run() {
  for (const item of testList) {
    try {
      const res = await download(item.url);
      console.log(`${item.name}: HTTP ${res.status} (length: ${res.length})`);
    } catch (e) {
      console.log(`${item.name}: ERROR ${e.message}`);
    }
    await sleep(650);
  }
}

run();
