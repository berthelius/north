#!/usr/bin/env node
// Validate the machine-readable spec: dist/api/spec/v0.1.json must be valid JSON,
// version 0.1, with the seven canonical sections in order; dist/spec.md must
// contain the same seven names as numbered headings. Exit 1 on any mismatch.
import { readFileSync } from 'node:fs';

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

if (errors.length) {
  console.error('check-spec: FAILED\n' + errors.map((e) => '  ' + e).join('\n'));
  process.exit(1);
}
console.log('check-spec: OK - 7 sections, version 0.1, JSON and spec.md agree');
