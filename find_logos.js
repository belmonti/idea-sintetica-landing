const https = require('https');

function getHtml(url) {
  return new Promise(res => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res(d));
    }).on('error', () => res(''));
  });
}

async function findLogos() {
  const mfHtml = await getHtml('https://manychat.com/');
  const cfHtml = await getHtml('https://www.clickfunnels.com/');
  const beHtml = await getHtml('https://birdeye.com/');

  const extract = (html) => {
    const matches = [];
    const re = /src=["']([^"']*(?:logo|brand)[^"']*\.(?:svg|png|webp))["']/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      matches.push(m[1]);
    }
    return matches;
  };

  console.log('Manychat:', extract(mfHtml).slice(0, 4));
  console.log('ClickFunnels:', extract(cfHtml).slice(0, 4));
  console.log('Birdeye:', extract(beHtml).slice(0, 4));
}

findLogos();
