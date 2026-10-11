/**
 * Dynamic OG image generation — /og/[slug].png
 *
 * Uses @vercel/og (satori + resvg) to generate 1200x630 PNG images.
 * Pre-renders all known slugs as static assets at build time.
 *
 * Design: the site's system on one card, in monochrome. Paper ground, Anton
 * title, JetBrains Mono for labels and the standfirst, the ink square, the
 * needle closing the host name (as in the header lockup), and the compass
 * instrument from the landing hero, settled on north.
 */

import type { APIRoute, GetStaticPaths } from 'astro';
import { ImageResponse } from '@vercel/og';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

// ---------------------------------------------------------------------------
// Slug definitions
// ---------------------------------------------------------------------------

interface SlugConfig {
  title: string;
  subtitle: string;
}

const SLUGS: Record<string, SlugConfig> = {
  default: {
    title: 'NORTH.md',
    subtitle: 'Give your AI agents judgment when the prompt runs out.',
  },
  spec: {
    title: 'NORTH.md Specification v0.1',
    subtitle: 'Seven sections: purpose, ambition and precomputed trade-offs.',
  },
  why: {
    title: 'Why NORTH.md',
    subtitle: 'Agents know how. Nobody told them how far.',
  },
  examples: {
    title: 'NORTH.md — Examples',
    subtitle: 'One real file and five illustrative ones, across five domains.',
  },
  faq: {
    title: 'NORTH.md — FAQ',
    subtitle: 'Straight answers, including what is not proven yet.',
  },
  changelog: {
    title: 'NORTH.md — Changelog',
    subtitle: 'Specification version history.',
  },
  compare: {
    title: 'Comparing Agent Conventions',
    subtitle: 'Where NORTH.md fits next to AGENTS.md, SOUL.md and DESIGN.md.',
  },
};

// ---------------------------------------------------------------------------
// Fonts and palette (module level: runs once at build time)
// ---------------------------------------------------------------------------

const moduleDir = dirname(fileURLToPath(import.meta.url));
const fontsRoot = join(moduleDir, '..', '..', '..', 'node_modules', '@fontsource');

// Satori reads WOFF1 (.woff), not WOFF2. Copy out exactly the file's bytes:
// on Node 24 a Buffer can be a view into a larger shared ArrayBuffer, so
// `.buffer` alone hands Satori unrelated bytes (CI failed with "<svg").
const font = (pkg: string, file: string): ArrayBuffer => {
  const bytes = readFileSync(join(fontsRoot, pkg, 'files', file));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
};

let fonts: { anton: ArrayBuffer; mono: ArrayBuffer; monoBold: ArrayBuffer } | null = null;
function loadFonts() {
  fonts ??= {
    anton: font('anton', 'anton-latin-400-normal.woff'),
    mono: font('jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
    monoBold: font('jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff'),
  };
  return fonts;
}

const PAPER = '#fafafa';
const INK = '#111111';
const MUTED = '#5c5c5c';
const RULE = '#d6d6d6';

// The compass from the landing hero (Compass.astro), settled on north.
function compassSvg(): string {
  const C = 200;
  const R = 184;
  const polar = (deg: number, r: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [(C + r * Math.cos(a)).toFixed(2), (C + r * Math.sin(a)).toFixed(2)];
  };
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const len = deg % 90 === 0 ? 22 : deg % 30 === 0 ? 13 : 6;
    const colour = deg % 30 === 0 ? INK : MUTED;
    const width = deg % 90 === 0 ? 2 : 1;
    const [x1, y1] = polar(deg, R);
    const [x2, y2] = polar(deg, R - len);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colour}" stroke-width="${width}"/>`;
  }).join('');
  const bearings = [-26, 12.8]
    .map((deg) => {
      const [x1, y1] = polar(deg, 18);
      const [x2, y2] = polar(deg, 150);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${MUTED}" stroke-width="1" stroke-dasharray="2 5"/>`;
    })
    .join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
<circle cx="200" cy="200" r="${R}" fill="none" stroke="${INK}" stroke-width="1"/>
<circle cx="200" cy="200" r="150" fill="none" stroke="${RULE}" stroke-width="1"/>
<line x1="200" y1="62" x2="200" y2="338" stroke="${RULE}" stroke-width="1"/>
<line x1="62" y1="200" x2="338" y2="200" stroke="${RULE}" stroke-width="1"/>
${ticks}
<path d="M193 1 L207 1 L200 11 Z" fill="${INK}"/>
${bearings}
<path d="M200 58 L189 200 L200 200 Z" fill="${INK}"/>
<path d="M200 58 L211 200 L200 200 Z" fill="${INK}"/>
<path d="M189 200 L200 342 L211 200 Z" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
<circle cx="200" cy="200" r="6" fill="${PAPER}" stroke="${INK}" stroke-width="1"/>
</svg>`;
}

const COMPASS_URI = `data:image/svg+xml;base64,${Buffer.from(compassSvg()).toString('base64')}`;
// The needle (NorthMark.astro), 1:2.6, in whole pixels (Satori rounds image boxes).
const NEEDLE = { width: 5, height: 13 };
const MARK_URI = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 26" width="${NEEDLE.width}" height="${NEEDLE.height}"><path d="M5 0 10 26 5 21.5 0 26Z" fill="${INK}"/></svg>`,
).toString('base64')}`;

// ---------------------------------------------------------------------------
// Element factory (plain objects compatible with satori / @vercel/og)
// ---------------------------------------------------------------------------

type SatoriStyle = Record<string, string | number>;

function el(type: string, props: Record<string, unknown>, ...children: unknown[]): unknown {
  return {
    type,
    key: null,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children.length > 1 ? children : undefined,
    },
  };
}

const box = (style: SatoriStyle, ...children: unknown[]) => el('div', { style: { display: 'flex', ...style } }, ...children);

// ---------------------------------------------------------------------------
// OG image layout
// ---------------------------------------------------------------------------

function buildOgElement(config: SlugConfig): unknown {
  // Short titles are set as a wordmark; longer ones step down to fit three lines.
  const titleSize = config.title.length <= 12 ? 168 : config.title.length <= 20 ? 112 : 96;
  const label: SatoriStyle = { fontFamily: 'Mono', fontSize: 18, letterSpacing: 1.6, textTransform: 'uppercase' };

  return box(
    { flexDirection: 'column', width: '100%', height: '100%', backgroundColor: PAPER, padding: '56px 72px 52px', color: INK },
    // Masthead: host + needle on the left, the version on the right, ink rule below.
    // The needle hangs from the top of the line, just above the ascenders, where
    // BRTHLS sets its square (header lockup proportions).
    box(
      { alignItems: 'center', justifyContent: 'space-between', paddingBottom: 20, borderBottom: `2px solid ${INK}` },
      box(
        { alignItems: 'flex-start', gap: 6 },
        box({ ...label, fontFamily: 'MonoBold', fontSize: 20, letterSpacing: 1, textTransform: 'none' }, 'northfile.dev'),
        el('img', { src: MARK_URI, width: NEEDLE.width, height: NEEDLE.height, style: { marginTop: -1 } }),
      ),
      box(
        { alignItems: 'center', gap: 12 },
        box({ width: 10, height: 10, backgroundColor: INK }),
        box({ ...label, color: MUTED }, 'spec v0.1'),
      ),
    ),
    // Body: title and subtitle on the left, the instrument on the right.
    box(
      { flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: 48 },
      box(
        { flexDirection: 'column', flex: 1 },
        box(
          { fontFamily: 'Anton', fontSize: titleSize, lineHeight: 0.95, textTransform: 'uppercase', maxWidth: 700 },
          config.title,
        ),
        box({ fontFamily: 'Mono', fontSize: 25, lineHeight: 1.45, color: MUTED, marginTop: 30, maxWidth: 680 }, config.subtitle),
      ),
      el('img', { src: COMPASS_URI, width: 340, height: 340 }),
    ),
    // Footer: the five-layer model, ruled.
    box(
      { ...label, fontSize: 15, color: MUTED, paddingTop: 18, borderTop: `1px solid ${RULE}`, textTransform: 'none', letterSpacing: 0.4 },
      'CONSTITUTION.md · AGENTS.md · DESIGN.md · SOUL.md · NORTH.md',
    ),
  );
}

// ---------------------------------------------------------------------------
// Astro endpoint
// ---------------------------------------------------------------------------

export const getStaticPaths: GetStaticPaths = () => {
  return Object.keys(SLUGS).map((slug) => ({
    params: { slug },
  }));
};

export const GET: APIRoute = async ({ params }) => {
  const slug = (params.slug as string) ?? 'default';
  const config = SLUGS[slug] ?? SLUGS.default;
  const { anton, mono, monoBold } = loadFonts();

  const response = new ImageResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildOgElement(config) as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Anton', data: anton, weight: 400, style: 'normal' },
        { name: 'Mono', data: mono, weight: 400, style: 'normal' },
        { name: 'MonoBold', data: monoBold, weight: 700, style: 'normal' },
      ],
    },
  );

  // Override cache header for static build (ImageResponse sets immutable by default)
  return new Response(await response.arrayBuffer(), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
