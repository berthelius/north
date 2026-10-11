<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://northfile.dev/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://northfile.dev/assets/hero-light.svg">
  <img alt="NORTH.md — Give your AI coding agents judgment when the prompt runs out" src="https://northfile.dev/assets/hero-dark.svg" width="100%">
</picture>

<p align="center">
  <a href="https://northfile.dev/spec"><img src="https://img.shields.io/badge/Spec-v0.1-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="Spec v0.1"></a>
  &nbsp;
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="License: MIT"></a>
  &nbsp;
  <a href="https://northfile.dev"><img src="https://img.shields.io/badge/Web-northfile.dev-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="Website: northfile.dev"></a>
</p>

# NORTH.md

**NORTH.md is an open markdown convention: one file at the root of a repository
that declares the project's purpose, ambition, and precomputed trade-offs, for
humans and AI coding agents alike.**

## Why

Coding agents tend to take the smaller interpretation of an ambiguous task. They
patch where a rewrite was due, add error handling instead of removing the
failure mode, and stop to ask "X or Y?" when the answer was a project decision
nobody wrote down. In long-running runs (Claude Code's `/goal`, Jules, Devin)
there is no one to ask, so the agent guesses.

The files agents already read cover other ground:

- `AGENTS.md` / `CLAUDE.md` — **how** to build, test and work in the repository.
- `CONSTITUTION.md` — **limits**: non-negotiable principles and boundaries.
- `DESIGN.md` — **look**: design tokens and the rationale behind them.
- `SOUL.md` — **who** the agent is: persona, values, tone.

None of them says why the project exists, how far to push, or which trade-off
wins when two valid choices collide. `NORTH.md` does, in seven short sections.

We propose seeing these five files as a five-layer model, with `NORTH.md` as the
direction layer. It is a proposal, not an established standard, and most
repositories will use only some of the layers. See
[northfile.dev/compare](https://northfile.dev/compare) for how each file
relates to `NORTH.md`.

## The template

```markdown
<!-- NORTH.md spec: v0.1 -->

# NORTH.md

## 1. North Star
[One sentence. The destination, not the roadmap.]

## 2. The Bar
[What quality threshold counts as "shipped". Mechanical gates & truth assertions.]

## 3. Asymmetric Bets
[Where we go 10x. Where we accept 1.1x.]

## 4. Anti-Goals
[What we refuse, even when easy or profitable.]

## 5. Trade-off Defaults
| Trade-off | Default | Flip when |
|---|---|---|
| Speed vs. safety | Safety on core logic; speed on internal tools | Never flip on fiscal/security code |
| Build vs. buy | Buy infrastructure; build core product | Vendor breaks unit economics |

## 6. Ambition Triggers
[Phrases that escalate scope when we are being too small.]

## 7. Reversibility
[One-way doors flagged. Two-way doors = move fast.]
```

The full definition of each section, with criteria and examples, is in
[SPEC.md](SPEC.md) and at [northfile.dev/spec](https://northfile.dev/spec)
([en español](https://northfile.dev/es/spec)).

## Adopt it in ten minutes

1. **Create `NORTH.md`** at the repository root and paste the template.
2. **Fill in the seven sections.** One sentence for the North Star. Real
   refusals for the Anti-Goals. A flip condition for every Trade-off Default.
   If a section does not apply, keep the heading and say why.
3. **Point your agents at it.**
   - In `CLAUDE.md`, add the line `@NORTH.md`. Claude Code imports the file
     into context at the start of each session.
   - In `AGENTS.md` or any other rules file, add:

     ```markdown
     See [NORTH.md](./NORTH.md) for project purpose and ambition. Before
     architectural decisions, check The Bar, the Anti-Goals and the Trade-off
     Defaults; do not flip a default unless its "Flip when" condition is met.
     ```
4. **Optionally, add the badge** to your README:

   ```markdown
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev)
   ```

Keep it short. A NORTH.md longer than two screens has lost the plot.

## Examples

[northfile.dev/examples](https://northfile.dev/examples) has one real file —
this repository's own [NORTH.md](NORTH.md) — and five illustrative ones for a
SaaS product, an open-source library, a creative agency, a side project and an
internal platform. The illustrative examples are composites of fictional
organisations.

## Machine-readable endpoints

- Raw specification: [`northfile.dev/spec.md`](https://northfile.dev/spec.md)
- JSON representation: [`northfile.dev/api/spec/v0.1.json`](https://northfile.dev/api/spec/v0.1.json)
- LLM index: [`northfile.dev/llms.txt`](https://northfile.dev/llms.txt)
- Full LLM dump: [`northfile.dev/llms-full.txt`](https://northfile.dev/llms-full.txt)
- Discovery pointer: [`northfile.dev/.well-known/llms.json`](https://northfile.dev/.well-known/llms.json)

## Contributing

Examples, editorial fixes and site improvements are welcome. Specification
changes go through an RFC first. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Author and license

Created by [Viktor Berthelius](https://brthls.com) (BRTHLS). Released under the
[MIT License](LICENSE).
