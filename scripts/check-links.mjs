#!/usr/bin/env node
// Crawl dist/: every internal href/src must resolve to a built file and every
// #fragment must exist as an id/name in the target page. Exit 1 on failure.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const ORIGIN = new URL(process.env.PUBLIC_SITE_URL ?? 'https://northfile.dev').origin;

const walk = (d) =>
  readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)],
  );
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
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
    const html = readFileSync(file, 'utf8');
    const ids = new Set();
    for (const m of html.matchAll(/\s(?:id|name)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      ids.add(m[1] ?? m[2] ?? m[3]);
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

for (const file of pages) {
  const html = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  const here = urlOf(file);
  const refs = [];
  for (const m of html.matchAll(ATTR)) refs.push(m[1] ?? m[2]);
  for (const m of html.matchAll(META)) refs.push(m[1]);
  for (const m of html.matchAll(SRCSET)) {
    for (const part of m[1].split(',')) refs.push(part.trim().split(/\s+/)[0]);
  }

  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, '&').trim();
    if (!ref || /^(mailto:|tel:|javascript:|data:|blob:)/i.test(ref)) continue;
    let u;
    try {
      u = new URL(ref, ORIGIN + here);
    } catch {
      errors.push(`${here}: unparsable URL "${ref}"`);
      continue;
    }
    if (u.origin !== ORIGIN) {
      if (/^https?:\/\/www\.northfile\.dev/i.test(ref)) errors.push(`${here}: non-apex host "${ref}"`);
      continue; // external
    }
    checked++;
    const target = resolveFile(u.pathname);
    if (!target) {
      errors.push(`${here}: broken link "${ref}" (no built file for ${u.pathname})`);
      continue;
    }
    if (u.hash.length > 1 && target.endsWith('.html')) {
      const frag = decodeURIComponent(u.hash.slice(1));
      if (!idsOf(target).has(frag)) {
        errors.push(`${here}: missing anchor "${ref}" (no #${frag} in ${urlOf(target)})`);
      }
    }
  }
}

if (errors.length) {
  const uniq = [...new Set(errors)];
  console.error(`check-links: ${uniq.length} problem(s) in ${pages.length} pages\n` + uniq.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-links: OK - ${checked} internal references across ${pages.length} pages`);
