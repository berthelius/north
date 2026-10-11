#!/usr/bin/env node
// SEO/AIO invariants over dist/: canonical on the apex, no trailing slash,
// <html lang> matches the path, hreflang only on pages with both versions and
// complete on every LOCALIZED_ROUTES page, absolute og:image, no noindex
// outside the 404, every JSON-LD block parses, sitemap lists every built page
// (ES included, 404 excluded) and nothing else. Exit 1 on failure.
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const SITE = 'https://northfile.dev';

// Routes that must carry the full hreflang set; read from the i18n source of truth.
const i18nSrc = readFileSync(new URL('../src/lib/i18n.ts', import.meta.url), 'utf8');
const routesSrc = i18nSrc.match(/LOCALIZED_ROUTES\b[^=]*=\s*\[([^\]]*)\]/)?.[1];
const LOCALIZED_ROUTES = [...(routesSrc ?? '').matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]);
if (!LOCALIZED_ROUTES.length) throw new Error('check-seo: could not read LOCALIZED_ROUTES from src/lib/i18n.ts');

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const errors = [];
if (!pages.length) errors.push(`no .html in ${DIST}/ (run npm run build first)`);

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[1] ?? m[2]) : undefined;
};
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
  const route = here.replace(/^\/es(\/|$)/, '/') || '/';
  if (!alts.length && LOCALIZED_ROUTES.includes(route)) err(`no hreflang links; ${route} is in LOCALIZED_ROUTES (expected en, es, x-default)`);
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
  // Any crawler directive (robots, googlebot, bingbot, X-Robots-Tag...) that blocks indexing.
  if (!is404) {
    for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
      const who = attr(tag, 'name') ?? attr(tag, 'http-equiv') ?? '';
      const content = attr(tag, 'content') ?? '';
      if (/robots|bot|slurp|spider|crawler/i.test(who) && /\b(noindex|none)\b/i.test(content)) err(`indexing blocked by ${tag}`);
    }
  }
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
  for (const l of locs) {
    if (!l.startsWith(SITE + '/')) errors.push(`sitemap URL off-apex: ${l}`);
    else if (!pages.some((p) => urlOf(p) === (l.slice(SITE.length).replace(/\/$/, '') || '/'))) errors.push(`sitemap lists ${l}, but no page is built for it`);
  }
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
