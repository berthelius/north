#!/usr/bin/env node
// SEO/AIO invariants over dist/: canonical on the apex, no trailing slash,
// <html lang> matches the path, hreflang only on pages with both versions,
// absolute og:image, every JSON-LD block parses, sitemap lists ES pages and
// not 404. Exit 1 on failure.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const SITE = 'https://northfile.dev';

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const errors = [];
if (!pages.length) errors.push(`no .html in ${DIST}/ (run npm run build first)`);

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const urlOf = (file) => {
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  return rel.replace(/(^|\/)index\.html$/, '$1').replace(/\/$/, '') || '/';
};

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const here = urlOf(file);
  const is404 = here === '/404.html';
  const err = (m) => errors.push(`${here}: ${m}`);

  const lang = attr(html.match(/<html\b[^>]*>/)?.[0] ?? '', 'lang');
  const wantLang = here === '/es' || here.startsWith('/es/') ? 'es' : 'en';
  if (lang !== wantLang) err(`<html lang="${lang}">, expected "${wantLang}"`);

  const canon = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)].map((m) => attr(m[0], 'href'));
  if (canon.length !== 1) err(`${canon.length} canonical links`);
  else if (!is404) {
    const expected = SITE + (here === '/' ? '/' : here);
    if (canon[0] !== expected) err(`canonical ${canon[0]} != ${expected}`);
  } else if (!canon[0].startsWith(SITE + '/')) err(`canonical ${canon[0]} not on apex`);

  const alts = [...html.matchAll(/<link\b[^>]*hreflang="[^"]*"[^>]*>/g)].map((m) => [attr(m[0], 'hreflang'), attr(m[0], 'href')]);
  if (alts.length) {
    const langs = alts.map(([l]) => l).sort().join(',');
    if (langs !== 'en,es,x-default') err(`hreflang set is ${langs}, expected en,es,x-default`);
    const en = here.replace(/^\/es(\/|$)/, '/') || '/';
    const es = en === '/' ? '/es' : '/es' + en;
    const want = { en: SITE + en, es: SITE + es, 'x-default': SITE + en };
    for (const [l, h] of alts) if (want[l] !== h) err(`hreflang ${l} -> ${h}, expected ${want[l]}`);
    const hasEs = pages.some((p) => urlOf(p) === es);
    const hasEn = pages.some((p) => urlOf(p) === en);
    if (!hasEs || !hasEn) err('hreflang declared but a counterpart page is not built');
  }

  const og = html.match(/<meta\b[^>]*property="og:image"[^>]*>/)?.[0];
  const ogUrl = og && attr(og, 'content');
  if (!ogUrl || !ogUrl.startsWith(SITE + '/')) err(`og:image not an absolute apex URL (${ogUrl})`);

  const robots = html.match(/<meta\b[^>]*name="robots"[^>]*>/)?.[0];
  if (!is404 && robots) err(`unexpected robots meta (${robots}); site is open to crawlers`);
  if (is404 && !/<meta\b[^>]*name="robots"[^>]*noindex/.test(html)) err('404 must be noindex');

  for (const m of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1]);
      for (const node of Array.isArray(j) ? j : [j]) {
        if (!node['@context'] || !node['@type']) err('JSON-LD block missing @context/@type');
      }
    } catch (e) {
      err(`JSON-LD does not parse (${e.message})`);
    }
  }
}

try {
  // The sitemap writer drops the root's trailing slash; host-only URLs are equivalent.
  const locs = [...readFileSync(`${DIST}/sitemap-0.xml`, 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => (m[1] === SITE ? SITE + '/' : m[1]));
  if (locs.some((l) => /\/404\/?$/.test(l))) errors.push('sitemap lists the 404 page');
  if (!locs.some((l) => l === `${SITE}/es`)) errors.push('sitemap is missing /es');
  for (const p of pages) {
    const u = urlOf(p);
    if (u === '/404.html') continue;
    if (!locs.includes(SITE + (u === '/' ? '/' : u))) errors.push(`sitemap is missing ${u}`);
  }
  for (const l of locs) if (!l.startsWith(SITE + '/')) errors.push(`sitemap URL off-apex: ${l}`);
} catch {
  errors.push('sitemap-0.xml missing');
}

try {
  const robotsTxt = readFileSync(`${DIST}/robots.txt`, 'utf8');
  if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) errors.push('robots.txt disallows the whole site');
  if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) errors.push('robots.txt is missing the Sitemap line');
} catch {
  errors.push('robots.txt missing');
}

if (errors.length) {
  console.error(`check-seo: ${errors.length} problem(s)\n` + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-seo: OK - ${pages.length} pages`);
