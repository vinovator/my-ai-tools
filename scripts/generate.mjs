// Regenerates sitemap.xml from the pages actually on disk, so it cannot drift
// when a tool is added or removed.
//
// Cloudflare serves this repo as-is, so the output is committed rather than
// produced at deploy time.
//
//     node scripts/generate.mjs           write it
//     node scripts/generate.mjs --check   fail if out of date (CI)

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'https://tools.vinothhaldorai.com';
const check = process.argv.includes('--check');

// Cloudflare Pages serves clean URLs: /mortgage/index.html redirects to
// /mortgage/, and /foo/bar.html to /foo/bar. The sitemap lists the resolved
// form, not the file path.
const urls = [`${HOST}/`];
for (const dir of readdirSync('.').filter((n) => !n.startsWith('.') && statSync(n).isDirectory())) {
    if (['scripts', 'node_modules'].includes(dir)) continue;
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.html')).sort()) {
        urls.push(f === 'index.html' ? `${HOST}/${dir}/` : `${HOST}/${dir}/${f.replace(/\.html$/, '')}`);
    }
}
urls.sort();

const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
    '\n</urlset>\n';

const path = 'sitemap.xml';
const current = existsSync(path) ? readFileSync(path, 'utf8') : '';

if (check) {
    if (current !== sitemap) {
        console.error(`[generate --check] sitemap.xml is out of date (${urls.length} urls expected).`);
        console.error('Run `node scripts/generate.mjs` and commit the result.');
        process.exit(1);
    }
    console.log(`[generate --check] sitemap.xml is current (${urls.length} urls)`);
} else {
    writeFileSync(path, sitemap);
    console.log(`[generate] sitemap.xml: ${urls.length} urls${current === sitemap ? ' (unchanged)' : ''}`);
}
