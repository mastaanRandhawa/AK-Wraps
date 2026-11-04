import fs from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('dist/sitemap.xml','utf8');
const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
for(const url of urls){
 const path=new URL(url).pathname;
 assert(path.endsWith('/'),url);
 const html=fs.readFileSync('dist'+path+'index.html','utf8');
 assert.equal(html.match(/rel="canonical" href="([^"]+)/)?.[1],url);
 assert.equal(html.match(/property="og:url" content="([^"]+)/)?.[1],url);
 assert(!/<meta name="robots" content="noindex/.test(html),url);
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
}
assert(!urls.some(u=>/\/(cart|checkout)\//.test(u)));
console.log(`PASS: ${urls.length} sitemap pages exist, are indexable, have matching final canonical/social URLs and valid structured data.`);
