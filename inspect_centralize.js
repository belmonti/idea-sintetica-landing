const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\fabia\\.gemini\\antigravity-ide\\brain\\1f681d44-115e-413a-8da2-e919344b356f\\.system_generated\\steps\\95\\content.md', 'utf8');

// Find all text blocks and images in the two sections
function extractAround(keyword, len = 2000) {
  let pos = 0;
  while ((pos = content.indexOf(keyword, pos)) !== -1) {
    console.log(`\n=== FOUND: ${keyword} at pos ${pos} ===`);
    const chunk = content.substring(pos, pos + len);
    const imgs = chunk.match(/src="([^"]+)"/g) || [];
    console.log('Images in chunk:', imgs);
    console.log('Text preview:', chunk.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').substring(0, 500));
    pos += keyword.length;
  }
}

extractAround('Herramientas que reemplaza');
extractAround('Integraciones');
extractAround('Centraliza');
