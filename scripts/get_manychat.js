const https = require('https');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function findLogo() {
  try {
    const html = await fetchText('https://manychat.com');
    console.log('HTML length:', html.length);
    const svgMatches = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
    console.log('SVGs found:', svgMatches.length);
    svgMatches.forEach((s, i) => {
      if (s.toLowerCase().includes('logo') || s.toLowerCase().includes('manychat') || i < 3) {
        console.log(`SVG ${i}:`, s.slice(0, 300));
      }
    });

    const imgMatches = html.match(/https:\/\/[^"']*(?:logo|manychat)[^"']*\.(?:svg|png)/gi) || [];
    console.log('Image matches:', imgMatches.slice(0, 5));
  } catch (e) {
    console.error(e);
  }
}

findLogo();
