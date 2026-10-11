#!/usr/bin/env node
// Validate the machine-readable spec: dist/api/spec/v0.1.json must be valid JSON,
// version 0.1, with the seven canonical sections in order; dist/spec.md must
// contain the same seven names as numbered headings.
// Then the north-adoption skill (source files, run from the repo root): README.md
// is the source of truth for the template and the AGENTS.md block, so
// skills/north-adoption/assets/NORTH.template.md (which the landing page imports)
// and PROMPT.md must carry README's template, with the seven canonical H2
// headings; references/integration.md and PROMPT.md must carry README's step-3
// AGENTS.md block; SKILL.md frontmatter must follow agentskills.io (name format
// and equal to the folder, description 1-1024 chars, licence present, metadata
// values quoted), its body must stay under 500 lines and every relative link in
// it must exist. Exit 1 on any mismatch.
import { readFileSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const SECTIONS = [
  'North Star',
  'The Bar',
  'Asymmetric Bets',
  'Anti-Goals',
  'Trade-off Defaults',
  'Ambition Triggers',
  'Reversibility',
];

const errors = [];
const read = (p) => {
  try {
    return readFileSync(`${DIST}/${p}`, 'utf8');
  } catch {
    errors.push(`${p}: missing (run npm run build first)`);
    return null;
  }
};

const raw = read('api/spec/v0.1.json');
if (raw !== null) {
  let spec;
  try {
    spec = JSON.parse(raw);
  } catch (e) {
    errors.push(`api/spec/v0.1.json: invalid JSON (${e.message})`);
  }
  if (spec) {
    if (spec.version !== '0.1') errors.push(`api/spec/v0.1.json: version is ${JSON.stringify(spec.version)}, expected "0.1"`);
    const names = (spec.sections ?? []).map((s) => s.name);
    if (JSON.stringify(names) !== JSON.stringify(SECTIONS)) {
      errors.push(`api/spec/v0.1.json: sections ${JSON.stringify(names)} != ${JSON.stringify(SECTIONS)}`);
    }
    (spec.sections ?? []).forEach((s, i) => {
      if (s.order !== i + 1) errors.push(`api/spec/v0.1.json: section "${s.name}" has order ${s.order}, expected ${i + 1}`);
    });
  }
}

const md = read('spec.md');
if (md !== null) {
  const headings = [...md.matchAll(/^###\s+\d+\.\s+(.+?)\s*$/gm)].map((m) => m[1]);
  if (JSON.stringify(headings) !== JSON.stringify(SECTIONS)) {
    errors.push(`spec.md: section headings ${JSON.stringify(headings)} != ${JSON.stringify(SECTIONS)}`);
  }
}

// --- The north-adoption skill ---
const SKILL = 'skills/north-adoption';
const src = (p) => {
  try {
    return readFileSync(p, 'utf8');
  } catch {
    errors.push(`${p}: missing`);
    return null;
  }
};
const fenced = (lang, body) => '```' + lang + '\n' + body + '\n```';

const readme = src('README.md');
const asset = src(`${SKILL}/assets/NORTH.template.md`);
const prompt = src(`${SKILL}/PROMPT.md`);
const integration = src(`${SKILL}/references/integration.md`);
const skill = src(`${SKILL}/SKILL.md`);

// The CLI installs only the skill folder, so it carries its own copy of the MIT notice.
const license = src('LICENSE');
const skillLicense = src(`${SKILL}/LICENSE`);
if (license !== null && skillLicense !== null && license !== skillLicense) errors.push(`${SKILL}/LICENSE: differs from the root LICENSE`);

if (readme !== null) {
  const tpl = /^## The template\n\n```markdown\n([\s\S]*?)\n```$/m.exec(readme)?.[1].trimEnd();
  if (!tpl) errors.push('README.md: no ```markdown block directly under "## The template"');
  else {
    if (asset !== null && asset.trimEnd() !== tpl) errors.push(`${SKILL}/assets/NORTH.template.md: differs from the README template block`);
    if (prompt !== null && !prompt.includes(fenced('markdown', tpl))) errors.push(`${SKILL}/PROMPT.md: does not contain the README template block verbatim`);
    const h2 = [...tpl.matchAll(/^##\s+(\d+)\.\s+(.+?)\s*$/gm)].map((m) => `${m[1]}. ${m[2]}`);
    const want = SECTIONS.map((s, i) => `${i + 1}. ${s}`);
    if (JSON.stringify(h2) !== JSON.stringify(want)) errors.push(`README.md: template headings ${JSON.stringify(h2)} != ${JSON.stringify(want)}`);
  }

  // Step 3's AGENTS.md block is indented inside a list item: compare it dedented.
  const agents = [...readme.matchAll(/^( *)```markdown\n([\s\S]*?)\n\1```$/gm)]
    .map(([, indent, body]) => body.split('\n').map((l) => l.slice(indent.length)).join('\n'))
    .find((b) => b.startsWith('See [NORTH.md](./NORTH.md)'));
  if (!agents) errors.push('README.md: no ```markdown block starting "See [NORTH.md](./NORTH.md)" (step 3)');
  else {
    for (const [p, text] of [[`${SKILL}/references/integration.md`, integration], [`${SKILL}/PROMPT.md`, prompt]]) {
      if (text !== null && !text.includes(fenced('markdown', agents))) errors.push(`${p}: does not contain README step 3's AGENTS.md block verbatim`);
    }
  }
}

if (skill !== null) {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(skill);
  if (!fm) errors.push(`${SKILL}/SKILL.md: no YAML frontmatter`);
  else {
    // Flat parser for this file's shape: top-level `key: value` plus one level of
    // indented `key: value` under the last top-level key. Block scalars are rejected.
    const top = {};
    const nested = {};
    let parent = null;
    for (const line of fm[1].split('\n')) {
      const m = /^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
      if (!m) continue;
      if (m[1]) {
        (nested[parent] ??= {})[m[2]] = m[3];
      } else {
        parent = m[2];
        top[m[2]] = m[3];
      }
    }
    const unquote = (v) => (/^(["']).*\1$/.test(v ?? '') ? v.slice(1, -1) : v ?? '');
    const name = unquote(top.name);
    const desc = unquote(top.description);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errors.push(`${SKILL}/SKILL.md: name "${name}" must be 1-64 chars of a-z, 0-9 and single inner hyphens`);
    if (name !== basename(SKILL)) errors.push(`${SKILL}/SKILL.md: name "${name}" must equal the folder name "${basename(SKILL)}"`);
    if (/^[|>]/.test(desc)) errors.push(`${SKILL}/SKILL.md: description must be a single-line value`);
    else if (desc.length < 1 || desc.length > 1024) errors.push(`${SKILL}/SKILL.md: description is ${desc.length} chars, must be 1-1024`);
    if (!unquote(top.license)) errors.push(`${SKILL}/SKILL.md: license missing`);
    for (const [k, v] of Object.entries(nested.metadata ?? {})) {
      if (!/^(["']).*\1$/.test(v)) errors.push(`${SKILL}/SKILL.md: metadata.${k} must be a quoted string`);
    }
    const bodyLines = skill.slice(fm[0].length).split('\n').length;
    if (bodyLines >= 500) errors.push(`${SKILL}/SKILL.md: body is ${bodyLines} lines, must be under 500`);
  }
  for (const [, href] of skill.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^[a-z][a-z0-9+.-]*:|^#/i.test(href)) continue;
    const path = join(SKILL, href.split('#')[0]);
    if (!existsSync(path)) errors.push(`${SKILL}/SKILL.md: links to ${href}, but ${path} does not exist`);
  }
}

if (errors.length) {
  console.error('check-spec: FAILED\n' + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('check-spec: OK - 7 sections, version 0.1, JSON and spec.md agree; north-adoption skill matches README and agentskills.io');
