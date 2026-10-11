/**
 * Renders SPEC.md / SPEC-ES.md into the /spec and /es/spec pages, so the
 * markdown files stay the single source of truth.
 *
 * Section ids are the same English slugs in both languages (stable permalinks
 * across locales). Both files must keep the same heading structure; the build
 * fails loudly if they drift.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const REPO_BLOB = 'https://github.com/berthelius/north/blob/main/';

export type SpecFile = 'SPEC.md' | 'SPEC-ES.md';

/** Heading ids in document order: every H2 and H3 of the spec body. */
const HEADING_IDS = [
  'abstract',
  'motivation',
  'file-location',
  'file-format',
  'the-seven-sections',
  'north-star',
  'the-bar',
  'asymmetric-bets',
  'anti-goals',
  'trade-off-defaults',
  'ambition-triggers',
  'reversibility',
  'propagation',
  'versioning',
  'relationship',
  'reference-implementation',
  'changelog',
  'v0-1',
] as const;

export interface SpecHeading {
  id: string;
  depth: 2 | 3;
  text: string;
  /** Label for the table of contents. */
  label: string;
}

export interface RenderedSpec {
  html: string;
  title: string;
  version: string;
  date: string;
  headings: SpecHeading[];
  /** Raw markdown per heading id, for the copy-section buttons. */
  sections: Record<string, string>;
}

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
}

const textOf = (n: HastNode): string =>
  n.type === 'text' ? (n.value ?? '') : (n.children ?? []).map(textOf).join('');

const el = (
  tagName: string,
  properties: Record<string, unknown>,
  children: HastNode[] = [],
): HastNode => ({ type: 'element', tagName, properties, children });

const txt = (value: string): HastNode => ({ type: 'text', value });

const COPY_ICON = [
  el('rect', { x: 5, y: 5, width: 9, height: 9, rx: 1.5, stroke: 'currentColor', strokeWidth: 1.5 }),
  el('path', {
    d: 'M11 5V3.5A1.5 1.5 0 009.5 2h-6A1.5 1.5 0 002 3.5v6A1.5 1.5 0 003.5 11H5',
    stroke: 'currentColor',
    strokeWidth: 1.5,
  }),
];

/** "1. North Star (Estrella Polar)" -> "1. Estrella Polar"; other text unchanged. */
const tocLabel = (text: string): string => {
  const m = text.match(/^(\d+\.)\s+.*\((.+)\)$/);
  return m ? `${m[1]} ${m[2]}` : text;
};

function makePlugin(copyLabel: string, copyAria: (t: string) => string, tableAria: string) {
  return () => (tree: HastNode) => {
    const kids = tree.children ?? [];
    const out: HastNode[] = [];
    let current: HastNode | null = null;
    let n = 0;
    let sectionTitle = '';

    for (const node of kids) {
      if (node.type === 'element' && node.tagName === 'hr') continue;
      if (node.type === 'text' && !node.value?.trim()) continue;

      const isHeading = node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3');
      if (isHeading) {
        const id = HEADING_IDS[n++];
        if (!id) throw new Error('spec: more headings than HEADING_IDS entries');
        const depth = node.tagName === 'h2' ? 2 : 3;
        const text = textOf(node).trim();
        const numbered = text.match(/^(\d+)\.\s+(.*)$/);
        const isChangelogEntry = depth === 3 && /^v\d/.test(text);
        sectionTitle = depth === 2 ? text : sectionTitle;

        const children: HastNode[] = numbered
          ? [el('span', { className: ['section-num'], ariaHidden: 'true' }, [txt(numbered[1])]), txt(numbered[2])]
          : [...(node.children ?? [])];
        if (!isChangelogEntry) {
          children.push(
            el('button', { className: ['copy-btn'], type: 'button', dataSection: id, ariaLabel: copyAria(text) }, [
              el('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', ariaHidden: 'true' }, COPY_ICON),
              el('span', { className: ['copy-label'] }, [txt(copyLabel)]),
            ]),
          );
        }
        const heading = el(
          node.tagName!,
          { id, className: [isChangelogEntry ? 'changelog-version-inline' : depth === 2 ? 'section-heading' : 'subsection-heading'] },
          children,
        );
        current = el('section', { ariaLabelledby: id, ...(numbered ? { className: ['numbered-section'] } : {}) }, [heading]);
        out.push(current);
        continue;
      }
      if (!current) throw new Error('spec: content found before the first heading');
      current.children!.push(node);
    }
    if (n !== HEADING_IDS.length) {
      throw new Error(`spec: expected ${HEADING_IDS.length} H2/H3 headings, found ${n}`);
    }

    const decorate = (node: HastNode, parent: HastNode, i: number): void => {
      if (node.type !== 'element') return;
      if (node.tagName === 'a') {
        // The spec's example snippet links to ./NORTH.md; on the site that means this repo's file.
        const href = String(node.properties?.href ?? '');
        const abs = href.startsWith('./') ? `${REPO_BLOB}${href.slice(2)}` : href;
        node.properties = { ...node.properties, href: abs, className: ['spec-link'] };
      } else if (node.tagName === 'pre') {
        node.properties = { ...node.properties, tabIndex: 0 };
      } else if (node.tagName === 'table') {
        parent.children![i] = el(
          'div',
          { className: ['table-wrapper'], role: 'region', ariaLabel: `${tableAria}: ${sectionTitle}`, tabIndex: 0 },
          [node],
        );
      }
      (node.children ?? []).forEach((c, j) => decorate(c, node, j));
    };
    out.forEach((s) => (s.children ?? []).forEach((c, j) => decorate(c, s, j)));
    tree.children = out;
  };
}

const LABELS = {
  'SPEC.md': { copy: 'Copy', aria: (t: string) => `Copy ${t} section markdown`, table: 'Table' },
  'SPEC-ES.md': { copy: 'Copiar', aria: (t: string) => `Copiar la sección ${t} en markdown`, table: 'Tabla' },
} as const;

const field = (head: string, re: RegExp): string => {
  const m = head.match(re);
  if (!m) throw new Error(`spec: header field ${re} not found`);
  return m[1].trim();
};

export async function renderSpec(file: SpecFile): Promise<RenderedSpec> {
  const raw = readFileSync(join(process.cwd(), file), 'utf-8').replace(/\r\n/g, '\n');
  const sep = raw.indexOf('\n---\n');
  if (sep < 0) throw new Error(`${file}: header separator not found`);
  const head = raw.slice(0, sep);
  const body = raw.slice(sep + 5).replace(/^\n+/, '');

  const title = field(head, /^# (.+)$/m);
  const version = field(head, /^\*\*(?:Version|Versión):\*\*\s*(.+)$/m);
  const date = field(head, /^\*\*(?:Date|Fecha):\*\*\s*(\d{4}-\d{2}-\d{2})/m);

  // Split the raw body per heading (outside code fences) for the copy buttons.
  const lines = body.split('\n');
  const marks: { depth: number; start: number; text: string }[] = [];
  let fence = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) fence = !fence;
    const m = !fence && line.match(/^(#{2,3}) (.+)$/);
    if (m) marks.push({ depth: m[1].length, start: i, text: m[2].trim() });
  });
  if (marks.length !== HEADING_IDS.length) {
    throw new Error(`${file}: expected ${HEADING_IDS.length} H2/H3 headings, found ${marks.length}`);
  }
  const sections: Record<string, string> = {};
  const headings: SpecHeading[] = marks.map((mk, i) => {
    const id = HEADING_IDS[i];
    const next = marks.slice(i + 1).find((o) => o.depth <= mk.depth);
    const end = next ? next.start : lines.length;
    sections[id] = lines.slice(mk.start, end).join('\n').replace(/\n---\s*$/, '').trim();
    return { id, depth: mk.depth as 2 | 3, text: mk.text, label: tocLabel(mk.text) };
  });

  const l = LABELS[file];
  const processor = await createMarkdownProcessor({
    syntaxHighlight: false,
    smartypants: false,
    rehypePlugins: [makePlugin(l.copy, l.aria, l.table)],
  });
  const { code } = await processor.render(body);

  return { html: code, title, version, date, headings, sections };
}
