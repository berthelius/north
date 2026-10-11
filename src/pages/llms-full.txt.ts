import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET(): Promise<Response> {
  const root = process.cwd();
  const specContent = readFileSync(join(root, 'SPEC.md'), 'utf-8');
  const readmeContent = readFileSync(join(root, 'README.md'), 'utf-8');
  const northContent = readFileSync(join(root, 'NORTH.md'), 'utf-8');

  const examples = (await getCollection('examples')).sort((a, b) => a.data.order - b.data.order);

  // The "real" example must stay a verbatim copy of the repository's NORTH.md.
  const realExample = examples.find((e) => e.id === 'northfile-dev');
  if (!realExample || (realExample.body ?? '').trim() !== northContent.trim()) {
    throw new Error(
      'src/content/examples/northfile-dev.md has drifted from NORTH.md. Copy NORTH.md into its body verbatim.',
    );
  }

  const exampleList = examples
    .map(
      (e) =>
        `- [${e.data.kind === 'real' ? 'REAL' : 'ILLUSTRATIVE'}] ${e.data.title} — ${e.data.subtitle}: https://northfile.dev/examples/${e.id}`,
    )
    .join('\n');

  const body = `# NORTH.md — Full LLM Dump

> NORTH.md is an open convention: one markdown file that declares a project's
> purpose, ambition and precomputed trade-offs for humans and AI coding agents.
> It is the direction layer in a five-layer model we propose, alongside
> CONSTITUTION.md (limits), AGENTS.md / CLAUDE.md (how agents work), DESIGN.md
> (look and feel) and SOUL.md (who the agent is). The model is a proposal, not
> an established standard.

This file is meant for direct ingestion by LLMs, AI crawlers and
retrieval pipelines. It inlines the repository introduction, the full
specification and this project's own NORTH.md.

Canonical URL: https://northfile.dev
Specification: https://northfile.dev/spec
Raw spec: https://northfile.dev/spec.md
JSON representation: https://northfile.dev/api/spec/v0.1.json
Repository: https://github.com/berthelius/north
Author: Viktor Berthelius (https://www.brthls.com)
License: MIT
Version: 0.1
Date: 2026-10-11

---

## Quick summary

Left to guess, coding agents tend to ship the safe, incremental version. They
optimise for "don't break" rather than "level up", patch what could be
redesigned, and add error handling for failure modes that should be removed at
their source.

A NORTH.md at the root of a repository tells the agent, and the people working
in it, where the project is going and how far to push to get there. It does
this in seven sections:

1. North Star — the destination, in one sentence.
2. The Bar — the quality threshold that separates "shipped" from "started".
3. Asymmetric Bets — where to invest 10x and where 1.1x is correct.
4. Anti-Goals — what the project refuses, even when easy or profitable, each with a reason.
5. Trade-off Defaults — recurring trade-offs decided in advance, each with the condition that flips it.
6. Ambition Triggers — short questions that escalate scope when the team is thinking too small.
7. Reversibility — which decisions are one-way doors and which are two-way.

---

## Repository introduction (README.md)

${readmeContent}

---

## The specification (SPEC.md)

${specContent}

---

## This project's own NORTH.md

The following is the NORTH.md file for the northfile.dev project itself — the
convention applied to its own repository.

${northContent}

---

## Examples

One real file and five illustrative ones. The illustrative examples describe
fictional organisations; their names, figures and domains are invented.

${exampleList}

---

## Related conventions

NORTH.md is designed to sit alongside these files, not to replace them:

- AGENTS.md — operational instructions for coding agents. https://agents.md
  (stewarded by the Agentic AI Foundation, Linux Foundation)
- CLAUDE.md — project instructions Claude Code loads at the start of each
  session; supports @path imports (Anthropic). https://code.claude.com/docs/en/memory
- CONSTITUTION.md — non-negotiable principles and boundaries. One community
  format: https://agentconstitution.dev. GitHub Spec Kit also keeps a project
  constitution.
- DESIGN.md — design tokens and rationale for coding agents (Google Labs).
  https://github.com/google-labs-code/design.md
- SOUL.md — the agent's persona, values and tone. https://soul.md
- llms.txt — a site index that helps LLMs and agents use a website, proposed
  by Jeremy Howard in 2024. https://llmstxt.org

---

## Machine-readable endpoints

The following endpoints are available for programmatic access:

- https://northfile.dev/spec — Rendered specification (HTML)
- https://northfile.dev/compare — Comparison with related conventions (HTML)
- https://northfile.dev/spec.md — Raw specification (text/markdown)
- https://northfile.dev/llms.txt — LLM index (text/plain)
- https://northfile.dev/llms-full.txt — This file (text/plain)
- https://northfile.dev/api/spec/v0.1.json — JSON representation of spec v0.1 (application/json)
- https://northfile.dev/.well-known/llms.json — Machine-readable LLM index (application/json)
- https://northfile.dev/badge.svg — Badge for README files

---

## Adoption

To adopt NORTH.md in a project:

1. Create NORTH.md at the repository root.
2. Fill in the seven sections. If a section does not apply, keep the heading
   and say why.
3. Point your agents at it. In CLAUDE.md, the line \`@NORTH.md\` imports the
   file into Claude Code's context at the start of each session. In AGENTS.md
   or another rules file, add:
   > See NORTH.md for project purpose and ambition.
4. Optional: add the badge to the README:
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
