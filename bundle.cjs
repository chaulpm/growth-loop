const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
let html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

const assetsDir = path.join(distDir, 'assets');
const assetFiles = fs.readdirSync(assetsDir);

const cssFile = assetFiles.find(f => f.endsWith('.css'));
const jsFile = assetFiles.find(f => f.endsWith('.js'));

if (cssFile) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');
  html = html.replace(/<link[^>]+rel=["']stylesheet["'][^>]*>/i, () => '<style>' + cssContent + '</style>');
  console.log('Inlined CSS:', cssFile, cssContent.length, 'bytes');
}

if (jsFile) {
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), 'utf8');
  html = html.replace(/<script[^>]+src=["'][^"']+\.js["'][^>]*><\/script>/i, () => '<script type="module">' + jsContent + '</script>');
  console.log('Inlined JS:', jsFile, jsContent.length, 'bytes');
}

fs.writeFileSync(path.join(distDir, 'bundle.html'), html, 'utf8');
console.log('Successfully generated dist/bundle.html, size:', html.length, 'bytes');
