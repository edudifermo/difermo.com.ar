import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
export function validateStatic(root = fileURLToPath(new URL('../out/', import.meta.url))) {
  const html = readFileSync(join(root, 'index.html'), 'utf8');
  assert.ok(existsSync(join(root, '404.html')), 'Missing 404.html');
  assert.match(html, /<html[^>]*lang="es"/);
  for (const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:|tel:|#|\/\/)/.test(url)) continue;
    assert.ok(existsSync(join(root, decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\//, ''))), `Missing asset: ${url}`);
  }
  const assets = readdirSync(join(root, '_next', 'static'), { recursive: true });
  for (const extension of ['.js','.css','.woff2']) assert.ok(assets.some(path => path.endsWith(extension)), `Missing ${extension}`);
  assert.ok(!html.includes('/_vinext/'));
  return html;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  validateStatic();
  console.log('Static export verified: HTML, 404, referenced assets, CSS, JS and fonts.');
}
