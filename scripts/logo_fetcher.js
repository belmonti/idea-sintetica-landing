const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'IdeaSinteticaBrandBot/1.0 (https://ideasintetica.pro; contact@ideasintetica.pro)'
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
  });
}

// Simple Icons library
const simpleIcons = require('simple-icons');

function getSimpleIconSvg(slug, customFill) {
  const icon = simpleIcons.Get(slug);
  if (!icon) return null;
  const hex = customFill || ('#' + icon.hex);
  return `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="${hex}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
}

async function searchWikimedia(query) {
  const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const buf = await fetchBuffer(apiUrl);
  const json = JSON.parse(buf.toString('utf8'));
  return json.query.search.map(s => s.title.replace('File:', ''));
}

async function getWikimediaFileUrl(filename) {
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

module.exports = { fetchBuffer, getSimpleIconSvg, searchWikimedia, getWikimediaFileUrl };

// Quick test
if (require.main === module) {
  (async () => {
    try {
      console.log('Testing simple-icons...');
      const siZapier = getSimpleIconSvg('zapier');
      console.log('siZapier:', siZapier ? siZapier.length + ' chars' : 'not found');

      console.log('Testing Wikimedia search for ManyChat...');
      const titles = await searchWikimedia('ManyChat logo');
      console.log('ManyChat search results:', titles.slice(0, 5));
    } catch (e) {
      console.error(e);
    }
  })();
}
