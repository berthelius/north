/**
 * Dynamic OG image generation — /og/[slug].png
 *
 * Uses @vercel/og (satori + resvg) to generate 1200x630 PNG images.
 * Pre-renders all known slugs as static assets at build time.
 *
 * Design: editorial paper background, Instrument Serif title,
 * rust accent rule, Inter subtitle, northfile.dev wordmark.
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
    subtitle: 'The seven canonical sections for purpose-driven projects.',
  },
  why: {
    title: 'Why NORTH.md',
    subtitle: 'Coding agents default to safe. NORTH.md fixes the asymmetry.',
  },
  examples: {
    title: 'NORTH.md — Examples',
    subtitle: 'Curated reference models across SaaS, OSS, agency, and platform architectures.',
  },
  faq: {
    title: 'NORTH.md — FAQ',
    subtitle: 'Common questions about the convention and the agent context trinity.',
  },
  changelog: {
    title: 'NORTH.md — Changelog',
    subtitle: 'Specification version history.',
  },
  compare: {
    title: 'Comparing Agent Conventions',
    subtitle: 'NORTH.md vs AGENTS.md, SOUL.md, VISION.md, and CONSTITUTION.md.',
  },
};

// ---------------------------------------------------------------------------
// Font loading (at module level — runs once at build time)
// ---------------------------------------------------------------------------

const moduleDir = dirname(fileURLToPath(import.meta.url));
const fontsRoot = join(moduleDir, '..', '..', '..', 'node_modules');

let instrumentSerifData: ArrayBuffer | null = null;

function loadFonts(): { instrumentSerif: ArrayBuffer } {
  if (!instrumentSerifData) {
    // Must use WOFF1 (.woff) — satori does not support WOFF2 (.woff2).
    // Inter subtitle uses the default Noto Sans bundled in @vercel/og.
    const serifPath = join(
      fontsRoot,
      '@fontsource',
      'instrument-serif',
      'files',
      'instrument-serif-latin-400-normal.woff'
    );
    instrumentSerifData = readFileSync(serifPath).buffer as ArrayBuffer;
  }
  return { instrumentSerif: instrumentSerifData };
}

// ---------------------------------------------------------------------------
// Element factory (plain objects compatible with satori / @vercel/og)
// ---------------------------------------------------------------------------

type SatoriStyle = Record<string, string | number>;

function el(
  type: string,
  props: Record<string, unknown>,
  ...children: unknown[]
): unknown {
  return {
    type,
    key: null,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children.length > 1 ? children : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// OG image layout
// ---------------------------------------------------------------------------

function buildOgElement(config: SlugConfig): unknown {
  const PAPER = '#fafaf9';
  const INK = '#0a0a0a';
  const MUTED = '#6b7280';
  const RUST = '#c2410c';
  const PAD = 80;

  return el(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: PAPER,
        padding: `${PAD}px`,
        fontFamily: '"InstrumentSerif", serif',
        position: 'relative',
      } as SatoriStyle,
    },
    // Main content area
    el(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: '1',
        } as SatoriStyle,
      },
      // Title
      el(
        'div',
        {
          style: {
            fontSize: '72px',
            fontFamily: '"InstrumentSerif", serif',
            fontWeight: '400',
            color: INK,
            lineHeight: '1.05',
            letterSpacing: '-1px',
            maxWidth: '960px',
          } as SatoriStyle,
        },
        config.title
      ),
      // Rust rule
      el('div', {
        style: {
          width: '64px',
          height: '2px',
          backgroundColor: RUST,
          marginTop: '36px',
          marginBottom: '28px',
        } as SatoriStyle,
      }),
      // Subtitle
      el(
        'div',
        {
          style: {
            fontSize: '26px',
            fontFamily: 'sans-serif',
            fontWeight: '400',
            color: MUTED,
            lineHeight: '1.45',
            maxWidth: '780px',
          } as SatoriStyle,
        },
        config.subtitle
      )
    ),
    // Bottom row: wordmark + domain
    el(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        } as SatoriStyle,
      },
      // Wordmark
      el(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
          } as SatoriStyle,
        },
        el(
          'div',
          {
            style: {
              fontSize: '16px',
              fontFamily: 'sans-serif',
              fontWeight: '600',
              color: INK,
              letterSpacing: '0.5px',
            } as SatoriStyle,
          },
          'northfile.dev'
        ),
        el('div', {
          style: {
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: RUST,
          } as SatoriStyle,
        }),
        el(
          'div',
          {
            style: {
              fontSize: '14px',
              fontFamily: 'sans-serif',
              fontWeight: '400',
              color: MUTED,
            } as SatoriStyle,
          },
          'spec v0.1'
        )
      ),
      // Trinity tag
      el(
        'div',
        {
          style: {
            fontSize: '13px',
            fontFamily: 'sans-serif',
            fontWeight: '400',
            color: MUTED,
            letterSpacing: '0.3px',
          } as SatoriStyle,
        },
        'AGENTS.md · SOUL.md · NORTH.md'
      )
    )
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

  const { instrumentSerif } = loadFonts();

  const response = new ImageResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buildOgElement(config) as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'InstrumentSerif',
          data: instrumentSerif,
          weight: 400,
          style: 'normal',
        },
        // Inter subtitle falls back to Noto Sans (bundled in @vercel/og by default).
      ],
    }
  );

  // Override cache header for static build (ImageResponse sets immutable by default)
  return new Response(await response.arrayBuffer(), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
    },
  });
};
