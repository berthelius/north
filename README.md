<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://northfile.dev/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://northfile.dev/assets/hero-light.svg">
  <img alt="NORTH.md — Give your AI agents judgment when the prompt runs out" src="https://northfile.dev/assets/hero-dark.svg" width="100%">
</picture>

<p align="center">
  <a href="https://northfile.dev/spec"><img src="https://img.shields.io/badge/Spec-v0.1-111111?style=flat-square&labelColor=111111&color=fafafa" alt="Spec v0.1"></a>
  &nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-111111?style=flat-square&labelColor=111111&color=fafafa" alt="License: MIT"></a>
  &nbsp;
  <a href="https://github.com/berthelius/north/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/berthelius/north/ci.yml?branch=main&style=flat-square&label=CI&labelColor=111111&color=fafafa" alt="CI status"></a>
  &nbsp;
  <a href="https://northfile.dev"><img src="https://img.shields.io/badge/Web-northfile.dev-111111?style=flat-square&labelColor=111111&color=fafafa" alt="Website: northfile.dev"></a>
  &nbsp;
  <a href="https://www.skillsdirectory.com/skills/berthelius-north-adoption"><img src="https://img.shields.io/badge/Skills_Directory-Security_A-111111?style=flat-square&labelColor=111111&color=fafafa" alt="Skills Directory: security grade A"></a>
</p>

# NORTH.md

**NORTH.md is an open convention: one markdown file that declares a project's
purpose, ambition and precomputed trade-offs for humans and AI coding agents.**

## The problem

Left to guess, coding agents tend to ship the safe, incremental version: a patch
where a redesign was due, more error handling where the failure mode should have gone.
The files they already read say how to build, what never to cross, how things
look and who the agent is. None says where the project is going, or how far to push.
On long, unattended runs there is no one to ask, so every decision nobody wrote
down becomes a guess.

## Where it fits

- `CONSTITUTION.md` — **limits**: non-negotiable principles and boundaries.
- `AGENTS.md` / `CLAUDE.md` — **how**: build, test and work in the repository.
- `DESIGN.md` — **look**: design tokens and the rationale behind them.
- `SOUL.md` — **who**: the agent's persona, values and tone.
- `NORTH.md` — **why, and how far**: purpose, ambition and precomputed trade-offs.

We propose reading these as five layers, with `NORTH.md` as the direction layer.
It is a model, not an established standard, and most repositories will use only
some of the layers. [northfile.dev/compare](https://northfile.dev/compare) sets
out what each file answers.

## The template

```markdown
<!-- NORTH.md spec: v0.1 -->

# NORTH.md

## 1. North Star
[One sentence. The destination, not the roadmap.]

## 2. The Bar
[What quality threshold counts as "shipped".]

## 3. Asymmetric Bets
[Where we go 10x. Where we accept 1.1x.]

## 4. Anti-Goals
[What we refuse, even when easy or profitable.]

## 5. Trade-off Defaults
| Trade-off | Default | Flip when |
|---|---|---|
| Speed vs. safety | Safety on core logic; speed on internal tools | An internal tool starts writing core data |
| Build vs. buy | Buy infrastructure; build core product | Vendor breaks unit economics |

## 6. Ambition Triggers
[Phrases that escalate scope when we are thinking too small.]

## 7. Reversibility
[One-way doors flagged. Two-way doors = move fast.]
```

The full definition of each section, with criteria and examples, is in
[SPEC.md](SPEC.md) and at [northfile.dev/spec](https://northfile.dev/spec)
([en español](https://northfile.dev/es/spec)).

## Adopt it in ten minutes

1. **Create `NORTH.md`** at the repository root and paste the template.
2. **Fill in the seven sections.** One sentence for the North Star. Real
   refusals in the Anti-Goals. A flip condition for every Trade-off Default.
   If a section does not apply, keep the heading and say why.
3. **Point your agents at it.**
   - In `CLAUDE.md`, add the line `@NORTH.md`. Claude Code loads `CLAUDE.md` at
     the start of every session, and the import brings `NORTH.md` with it.
   - In `AGENTS.md` or any other rules file, add:

     ```markdown
     See [NORTH.md](./NORTH.md) for project purpose and ambition. Before
     architectural decisions, check The Bar, the Anti-Goals and the Trade-off
     Defaults; do not flip a default unless its "Flip when" condition is met.
     ```
4. **Optional: add the badge** to your README.

   ```markdown
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev)
   ```

Keep it short. A NORTH.md longer than two screens has lost the plot. A first
draft takes ten minutes; a good one takes longer, and that is where the value is.

**Or let your agent interview you.** The [`north-adoption`](skills/north-adoption/)
skill has your agent read the repository first, ask you one question at a time,
draft the seven sections, test the draft against three decisions from your
project and, once you approve, point your agents at it as in step 3:

```bash
npx skills add berthelius/north --skill north-adoption
```

Agents without skill support can use its
[`PROMPT.md`](skills/north-adoption/PROMPT.md) instead.

## Examples

[northfile.dev/examples](https://northfile.dev/examples) has one real file, this
repository's own [NORTH.md](NORTH.md), and five illustrative ones for fictional
organisations: a B2B SaaS product, an open-source library, a creative studio, a
side project and an internal platform. Their names and figures are invented.

## Status

v0.1, first public release on 2026-10-11. The seven section names are stable;
guidance and examples may still change in minor versions. There is no published
evaluation yet: that NORTH.md improves agent decisions is a hypothesis. If you
test it, open an issue with the results, flattering or not.

## Machine-readable endpoints

- Raw specification: [`northfile.dev/spec.md`](https://northfile.dev/spec.md)
- JSON representation: [`northfile.dev/api/spec/v0.1.json`](https://northfile.dev/api/spec/v0.1.json)
- LLM index: [`northfile.dev/llms.txt`](https://northfile.dev/llms.txt)
- Full text for LLMs: [`northfile.dev/llms-full.txt`](https://northfile.dev/llms-full.txt)
- Discovery pointer: [`northfile.dev/.well-known/llms.json`](https://northfile.dev/.well-known/llms.json)

## Contributing

Examples, editorial fixes and site improvements are welcome. Specification
changes go through an RFC first. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author and licence

Created by [Viktor Berthelius](https://brthls.com) (BRTHLS). Released under the
[MIT License](LICENSE).
