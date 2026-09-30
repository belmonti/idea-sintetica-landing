const https = require('https');

function getJson(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'IdeaSinteticaBrandBot/1.0 (https://ideasintetica.pro; admin@ideasintetica.pro)'
      }
    };
    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function search() {
  try {
    const data = await getJson('https://api.github.com/search/code?q=filename:manychat+extension:svg');
    console.log('Total items:', data.total_count);
    if (data.items) {
      data.items.slice(0, 5).forEach(item => {
        console.log(item.name, 'in', item.repository.full_name, '->', item.html_url);
      });
    }
  } catch (e) {
    console.error(e);
  }
}

search();
