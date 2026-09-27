// Static invariant checks for a repo Cloudflare serves as-is. These assert what
// has silently broken here before: a tool page shipping without the brand
// favicon or a canonical, or a card on the landing page pointing at a tool that
// does not exist.
//
//     node scripts/check-site.mjs

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'https://tools.vinothhaldorai.com';
const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

const pages = ['index.html'];
for (const dir of readdirSync('.').filter((n) => !n.startsWith('.') && statSync(n).isDirectory())) {
    if (['scripts', 'node_modules'].includes(dir)) continue;
    for (const f of readdirSync(dir).filter((n) => n.endsWith('.html'))) pages.push(join(dir, f));
}

for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const prefix = page.includes('/') ? '../' : '';

    if (!/<meta name="viewport"/.test(html)) fail(page, 'missing viewport meta');
    if (!html.includes(`${prefix}favicon.svg`)) fail(page, 'missing brand favicon');
    if (!/<title>[^<]+<\/title>/.test(html)) fail(page, 'missing or empty title');
    if (!new RegExp(`rel="canonical" href="${HOST}`).test(html)) {
        fail(page, 'missing canonical on the subdomain');
    }
    // The old inline purple-V icon, replaced by the shared brand mark.
    if (/rel="icon" href="data:/.test(html)) fail(page, 'still uses an inline data-URI favicon');
}

// The landing page must only link tools that exist.
const landing = readFileSync('index.html', 'utf8');
const grid = landing.slice(landing.indexOf('<main'));
const local = [...grid.matchAll(/href="((?!https?:|#|mailto:)[^"]+)"/g)].map((m) => m[1]);
for (const href of new Set(local)) {
    const f = href.replace(/[?#].*$/, '');
    if (!existsSync(f)) fail('index.html', `links to a missing file: ${href}`);
}

// The shared chrome, mirrored from vinothhaldorai.com.
for (const needle of ['site-bar', 'site-footer', 'vinothhaldorai.com/now/', 'vinothhaldorai.com']) {
    if (!landing.includes(needle)) fail('index.html', `missing shared chrome: ${needle}`);
}

console.log(`[check-site] ${pages.length} pages, ${new Set(local).size} local links checked`);
if (failures.length) {
    console.error(`\n[check-site] ${failures.length} failure(s):`);
    for (const f of failures) console.error('  ' + f);
    process.exit(1);
}
console.log('[check-site] all invariants hold');
