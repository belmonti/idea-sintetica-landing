const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const assetMatches = [
  ...(html.match(/src="([^"]+)"/g) || []).map(m => m.replace('src="', '').replace('"', '')),
  ...(html.match(/href="([^"]+\.(?:css|svg|ico))"/g) || []).map(m => m.replace('href="', '').replace('"', ''))
];

const uniqueAssets = Array.from(new Set(assetMatches)).filter(p => !p.startsWith('http') && !p.startsWith('data:'));

console.log(`Checking ${uniqueAssets.length} unique local assets against http://localhost:3000/...`);

function testAsset(assetPath) {
  return new Promise((resolve) => {
    const url = 'http://localhost:3000/' + assetPath;
    http.get(url, (res) => {
      let len = 0;
      res.on('data', chunk => len += chunk.length);
      res.on('end', () => {
        resolve({
          asset: assetPath,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          bytes: len
        });
      });
    }).on('error', (err) => {
      resolve({
        asset: assetPath,
        status: 'ERROR',
        error: err.message
      });
    });
  });
}

async function verifyAll() {
  const results = [];
  let failures = 0;

  for (const asset of uniqueAssets) {
    const res = await testAsset(asset);
    results.push(res);
    if (res.status !== 200 || res.bytes === 0) {
      failures++;
      console.error(`FAIL: ${res.asset} -> Status ${res.status}, ${res.bytes} bytes`);
    }
  }

  if (failures === 0) {
    console.log(`\nPERFECT: All ${uniqueAssets.length} assets return HTTP 200 with non-zero bytes.`);
  } else {
    console.error(`\nFAILED: ${failures} assets could not be retrieved.`);
  }
}

verifyAll();
