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

> NORTH.md is a markdown convention that declares a software project's purpose,
> ambition, and trade-off defaults in a form readable by both humans and AI
> coding agents. It proposes a direction layer that sits alongside
> CONSTITUTION.md (limits), AGENTS.md / CLAUDE.md (how agents work), DESIGN.md
> (look and feel), and SOUL.md (who the agent is). The five-layer model is a
> proposal, not an established standard.

This file is intended for direct ingestion by LLMs, AI web crawlers, and
retrieval-augmented generation pipelines. It contains the full specification,
repository introduction, and this project's own NORTH.md inline.

Canonical URL: https://northfile.dev
Specification: https://northfile.dev/spec
Raw spec: https://northfile.dev/spec.md
JSON schema: https://northfile.dev/api/spec/v0.1.json
Repository: https://github.com/berthelius/north
Author: Viktor Berthelius (https://brthls.com)
License: MIT
Version: 0.1
Date: 2026-10-11

---

## Quick summary

NORTH.md addresses a common pattern in AI coding agents: they tend to default to
safe, incremental output. They optimise for "don't break" rather than "level up".
They patch what could be rewritten, and add error handling for failure modes that
should be removed at their source.

A NORTH.md file placed at the root of a repository tells the agent — and the
humans working in it — where the project is going and how far it intends to push
to get there. It does this in seven sections:

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

## The specification (SPEC.md)

${specContent}

---

## This project's own NORTH.md

The following is the NORTH.md file for the northfile.dev project itself — the
convention applied to its own repository.

${northContent}

---

## Examples

One real file and five illustrative ones. Illustrative examples are composites
of fictional organisations; their names, figures and domains are invented.

${exampleList}

---

## Related conventions

NORTH.md is designed to sit alongside these files, not to replace them:

- AGENTS.md — operational instructions for coding agents. https://agents.md
  (stewarded by the Agentic AI Foundation, Linux Foundation)
- CLAUDE.md — project instructions loaded by Claude Code (Anthropic).
  https://code.claude.com/docs/en/memory
- CONSTITUTION.md — non-negotiable principles and boundaries. One community
  format: https://agentconstitution.dev. GitHub Spec Kit also keeps a project
  constitution.
- DESIGN.md — design tokens and rationale for coding agents (Google Labs).
  https://github.com/google-labs-code/design.md
- SOUL.md — the agent's persona, values and tone. https://soul.md
- llms.txt — a site index that helps LLMs and agents use a website.
  https://llmstxt.org

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

1. Create a NORTH.md file at the repository root.
2. Fill in the seven sections.
3. Point to it from CLAUDE.md / AGENTS.md:
   > See NORTH.md for project purpose and ambition.
   In CLAUDE.md, the line \`@NORTH.md\` imports the file into Claude Code's
   context at session start.
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
