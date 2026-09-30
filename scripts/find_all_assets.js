const https = require('https');
const fs = require('fs');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      const options = {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        headers: {
          'User-Agent': 'IdeaSinteticaBrandBot/1.0 (https://ideasintetica.pro; contact@ideasintetica.pro)',
          'Accept': 'text/html,application/xhtml+xml,application/xml,image/svg+xml,image/*,*/*'
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
    } catch (err) {
      reject(err);
    }
  });
}

async function searchWikimedia(query) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const buf = await fetchBuffer(apiUrl);
  const json = JSON.parse(buf.toString('utf8'));
  return json.query.search.map(s => s.title.replace('File:', ''));
}

async function getWikimediaUrl(filename) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
  const buf = await fetchBuffer(apiUrl);
  const json = JSON.parse(buf.toString('utf8'));
  const pages = json.query.pages;
  const pageId = Object.keys(pages)[0];
  if (pages[pageId] && pages[pageId].imageinfo && pages[pageId].imageinfo[0]) {
    return pages[pageId].imageinfo[0].url;
  }
  return null;
}

async function checkCandidates() {
  const brandQueries = {
    manychat: 'ManyChat logo',
    calendly: 'Calendly logo',
    hubspot: 'HubSpot logo',
    hootsuite: 'Hootsuite logo',
    mailchimp: 'Mailchimp logo',
    salesforce: 'Salesforce logo',
    quickbooks: 'QuickBooks logo',
    mailgun: 'Mailgun logo',
    tiktok: 'TikTok logo',
    activecampaign: 'ActiveCampaign logo',
    kajabi: 'Kajabi logo'
  };

  for (const [key, q] of Object.entries(brandQueries)) {
    try {
      const results = await searchWikimedia(q);
      console.log(`\n=== ${key.toUpperCase()} (query: "${q}") ===`);
      for (const title of results.slice(0, 4)) {
        const url = await getWikimediaUrl(title);
        console.log(`  ${title} -> ${url}`);
      }
    } catch (e) {
      console.error(`Error for ${key}:`, e.message);
    }
  }
}

checkCandidates();
