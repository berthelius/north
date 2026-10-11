/**
 * Dynamic badge endpoint — /badge.svg
 *
 * Query params:
 *   style  = flat (default) | flat-square | for-the-badge
 *   theme  = light (default) | dark | auto
 *
 * Pre-renders the default variant (flat + auto) at build time.
 * For static output mode this endpoint is pre-rendered as /badge.svg
 * Flat fields, no gloss, monochrome: an ink half and a paper half inside a
 * hairline frame. Each half's text contrasts with its own field, so the badge
 * reads on light and dark READMEs even where the auto theme cannot tell
 * which one it sits on.
 */

import type { APIRoute } from 'astro';

export const prerender = true;

const INK = '#111111';
const PAPER = '#fafafa';

interface BadgeOptions {
  style: 'flat' | 'flat-square' | 'for-the-badge';
  theme: 'light' | 'dark' | 'auto';
}

function measureText(text: string, fontSize: number): number {
  // Approximation: average character width ratio varies by font.
  // Using ~0.6 of font-size as an average glyph width for sans-serif.
  return Math.ceil(text.length * fontSize * 0.60) + 8; // +8 padding
}

function buildSVG(opts: BadgeOptions): string {
  const { style, theme } = opts;

  const isFTB = style === 'for-the-badge';
  const isSquare = style === 'flat-square';

  const height = isFTB ? 28 : 20;
  const fontSize = isFTB ? 12 : 11;
  const textY = isFTB ? 18 : 15;
  const rx = isSquare ? 0 : 2;
  const fontFamily = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
  const fontWeight = isFTB ? '700' : '600';
  const labelText = isFTB ? 'NORTH.MD' : 'north.md';
  const versionText = isFTB ? 'V0.1' : 'v0.1';
  const letterSpacing = isFTB ? '1' : '0';

  const leftText = labelText;
  const rightText = versionText;

  const leftWidth = measureText(leftText, fontSize);
  const rightWidth = measureText(rightText, fontSize);
  const totalWidth = leftWidth + rightWidth;

  // Light: ink label, paper version, ink frame. Dark swaps ink and paper.
  // Auto draws light and swaps through CSS @media inside the SVG.
  const [fig, ground] = theme === 'dark' ? [PAPER, INK] : [INK, PAPER];

  const autoCSS = theme === 'auto'
    ? `
      <style>
        @media (prefers-color-scheme: dark) {
          .fig { fill: ${PAPER}; }
          .ground { fill: ${INK}; }
          .frame { stroke: ${PAPER}; }
        }
      </style>`
    : '';

  const leftCX = Math.round(leftWidth / 2);
  const rightCX = leftWidth + Math.round(rightWidth / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="${labelText}: ${versionText}">
  <title>${labelText} ${versionText}</title>
  <defs>
    <clipPath id="r">
      <rect width="${totalWidth}" height="${height}" rx="${rx}" fill="#fff"/>
    </clipPath>${autoCSS}
  </defs>
  <g clip-path="url(#r)">
    <rect class="fig" fill="${fig}" width="${leftWidth}" height="${height}"/>
    <rect class="ground" fill="${ground}" x="${leftWidth}" width="${rightWidth}" height="${height}"/>
  </g>
  <rect class="frame" fill="none" stroke="${fig}" x="0.5" y="0.5" width="${totalWidth - 1}" height="${height - 1}" rx="${rx}"/>
  <g text-anchor="middle" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" letter-spacing="${letterSpacing}">
    <text class="ground" fill="${ground}" x="${leftCX}" y="${textY}">${leftText}</text>
    <text class="fig" fill="${fig}" x="${rightCX}" y="${textY}">${rightText}</text>
  </g>
</svg>`;
}

export const GET: APIRoute = ({ url }) => {
  const params = url.searchParams;

  const rawStyle = params.get('style') ?? 'flat';
  const rawTheme = params.get('theme') ?? 'auto';

  const style = ['flat', 'flat-square', 'for-the-badge'].includes(rawStyle)
    ? (rawStyle as BadgeOptions['style'])
    : 'flat';

  const theme = ['light', 'dark', 'auto'].includes(rawTheme)
    ? (rawTheme as BadgeOptions['theme'])
    : 'auto';

  const svg = buildSVG({ style, theme });

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
    },
  });
};
