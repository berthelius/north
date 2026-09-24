import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const prerender = true;

export async function GET(): Promise<Response> {
  const root = process.cwd();
  const specContent = readFileSync(join(root, 'SPEC.md'), 'utf-8');
  const readmeContent = readFileSync(join(root, 'README.md'), 'utf-8');
  const northContent = readFileSync(join(root, 'NORTH.md'), 'utf-8');

  const body = `# NORTH.md — Full LLM Dump

> NORTH.md is a markdown convention that declares a software project's purpose,
> ambition, and trade-off defaults in a form readable by both humans and AI
> coding agents. It is the direction and arbitration layer in the 5-layer agent
> governance stack, complementing CONSTITUTION.md (limits), AGENTS.md / CLAUDE.md
> (execution), design.md (visual system), and SOUL.md (identity).

This file is intended for direct ingestion by LLMs, AI web crawlers, and
retrieval-augmented generation pipelines. It contains the full specification,
repository introduction, and reference implementation inline.

Canonical URL: https://northfile.dev
Specification: https://northfile.dev/spec
Raw spec: https://northfile.dev/spec.md
JSON schema: https://northfile.dev/api/spec/v0.1.json
Repository: https://github.com/berthelius/north
Author: Viktor Berthelius (https://brthls.com)
License: MIT
Version: 0.1
Date: 2026-09-24

---

## Quick summary

NORTH.md fixes a systematic problem with AI coding agents: they default to safe,
incremental output. They optimise for "don't break" rather than "level up". They
patch what could be rewritten, and add error handling for failure modes that
should be removed at their source.

A NORTH.md file placed at the root of a repository tells the agent — and the
humans working in it — where the project is going and how far it intends to push
to get there. It does this in seven canonical sections:

1. North Star — the destination, in one sentence.
2. The Bar — the quality threshold that separates "shipped" from "started".
3. Asymmetric Bets — where to invest 10x and where 1.1x is correct.
4. Anti-Goals — what the project explicitly refuses, even when easy.
5. Trade-off Defaults — precomputed decisions so they are not re-debated.
6. Ambition Triggers — phrases that escalate scope when the team is being too small.
7. Reversibility — which decisions are one-way doors vs. two-way doors.

---

## Repository introduction (README.md)

${readmeContent}

---

## The canonical specification (SPEC.md)

${specContent}

---

## Reference NORTH.md for this project

The following is the NORTH.md file for the northfile.dev project itself —
a worked example of the convention applied to its own repository.

${northContent}

---

## Agent context trinity

NORTH.md is the third file in the agent context trinity:

- CLAUDE.md / AGENTS.md — how agents work (rules, gates, workflow).
- SOUL.md — who the project is (identity, voice, values).
- NORTH.md — why and how far (purpose, ambition, defaults).

Related conventions:
- AGENTS.md convention: https://agents.md
- SOUL.md convention: https://soul.md
- llms.txt convention: https://llmstxt.org

---

## Machine-readable endpoints

The following endpoints are available for programmatic access:

- https://northfile.dev/spec — Rendered specification (HTML)
- https://northfile.dev/compare — Ecosystem comparison matrix (HTML)
- https://northfile.dev/spec.md — Raw specification (text/markdown)
- https://northfile.dev/llms.txt — LLM index (text/plain)
- https://northfile.dev/llms-full.txt — This file (text/plain)
- https://northfile.dev/api/spec/v0.1.json — JSON schema v0.1 representation (application/json)
- https://northfile.dev/.well-known/llms.json — Machine-readable LLM index (application/json)
- https://northfile.dev/badge.svg — Adoption badge for README files

---

## Adoption

To adopt NORTH.md in a project:

1. Create a NORTH.md file at the repository root.
2. Fill in the seven canonical sections.
3. Reference it from CLAUDE.md / AGENTS.md:
   > See NORTH.md for project purpose and ambition.
4. Optionally add the badge to the README:
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev)

The specification is versioned via semver. A NORTH.md file may declare the
spec version it targets via an HTML comment on the first line:
<!-- NORTH.md spec: v0.1 -->

---

End of northfile.dev LLM dump.
Generated at: https://northfile.dev/llms-full.txt
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
    },
  });
}
