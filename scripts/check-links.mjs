#!/usr/bin/env node
// Crawl dist/: every internal href/src must resolve to a built file and every
// #fragment must exist as an id="" (or <a name="">) in the target page. Plain
// outputs (.txt, .md, .json, .xml) are scanned for absolute site URLs, which
// must resolve the same way. Exit 1 on failure, or if nothing was checked.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const ORIGIN = new URL(process.env.PUBLIC_SITE_URL ?? 'https://northfile.dev').origin;

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const files = walk(DIST);
const pages = files.filter((f) => f.endsWith('.html'));
const plain = files.filter((f) => /\.(txt|md|json|xml)$/.test(f));
if (!pages.length) {
  console.error(`check-links: no .html files in ${DIST}/ (run npm run build first)`);
  process.exit(1);
}

const urlOf = (file) => {
  const rel = '/' + relative(DIST, file).split(sep).join('/');
  return rel.replace(/(^|\/)index\.html$/, '$1') || '/';
};

// URL path -> built file, or null.
function resolveFile(pathname) {
  const p = decodeURIComponent(pathname);
  const base = join(DIST, p);
  for (const c of [base, base + '.html', join(base, 'index.html')]) {
    if (existsSync(c) && statSync(c).isFile()) return c;
  }
  return null;
}

const idCache = new Map();
function idsOf(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const ids = new Set();
    const VAL = `(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`;
    // Anchor targets: any element's id, or the legacy <a name> (not <meta name> etc.).
    for (const re of [new RegExp(`\\sid=${VAL}`, 'g'), new RegExp(`<a\\b[^>]*?\\sname=${VAL}`, 'gi')]) {
      for (const m of html.matchAll(re)) ids.add(m[1] ?? m[2] ?? m[3]);
    }
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

const ATTR = /<(?:a|link|img|source|script|iframe|video|audio|area)\b[^>]*?\s(?:href|src)=(?:"([^"]*)"|'([^']*)')/g;
const META = /<meta\b[^>]*?(?:property|name)="(?:og:image|og:url|twitter:image)"[^>]*?content="([^"]*)"/g;
const SRCSET = /\ssrcset="([^"]*)"/g;

const errors = [];
let checked = 0;

function check(here, raw) {
  const ref = raw.replace(/&amp;/g, '&').trim();
  if (!ref || /^(mailto:|tel:|javascript:|data:|blob:)/i.test(ref)) return;
  let u;
  try {
    u = new URL(ref, ORIGIN + here);
  } catch {
    errors.push(`${here}: unparsable URL "${ref}"`);
    return;
  }
  if (u.origin !== ORIGIN) {
    if (/^https?:\/\/www\.northfile\.dev/i.test(ref)) errors.push(`${here}: non-apex host "${ref}"`);
    return; // external
  }
  checked++;
  const target = resolveFile(u.pathname);
  if (!target) {
    errors.push(`${here}: broken link "${ref}" (no built file for ${u.pathname})`);
    return;
  }
  if (u.hash.length > 1 && target.endsWith('.html')) {
    const frag = decodeURIComponent(u.hash.slice(1));
    if (!idsOf(target).has(frag)) {
      errors.push(`${here}: missing anchor "${ref}" (no #${frag} in ${urlOf(target)})`);
    }
  }
}

for (const file of pages) {
  const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const here = urlOf(file);
  const refs = [];
  for (const m of html.matchAll(ATTR)) refs.push(m[1] ?? m[2]);
  for (const m of html.matchAll(META)) refs.push(m[1]);
  for (const m of html.matchAll(SRCSET)) {
    for (const part of m[1].split(',')) refs.push(part.trim().split(/\s+/)[0]);
  }

  for (const raw of refs) check(here, raw);
}

// Absolute site URLs inside llms.txt, spec.md, the JSON API, sitemaps, robots.txt...
const SITE_URL = new RegExp(`https?://(?:www\\.)?${ORIGIN.replace(/^https?:\/\//, '').replace(/\./g, '\\.')}(?![\\w-]|\\.\\w)[^\\s"'<>()\\[\\]\`]*`, 'g');
for (const file of plain) {
  const here = urlOf(file);
  for (const [raw] of readFileSync(file, 'utf8').matchAll(SITE_URL)) check(here, raw.replace(/[.,;:!?]+$/, ''));
}

if (!checked) {
  console.error(`check-links: 0 internal references checked in ${DIST}/; the crawl found nothing to verify`);
  process.exit(1);
}

if (errors.length) {
  const uniq = [...new Set(errors)];
  console.error(`check-links: ${uniq.length} problem(s) in ${pages.length} pages\n` + uniq.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-links: OK - ${checked} internal references across ${pages.length} pages and ${plain.length} plain files`);
