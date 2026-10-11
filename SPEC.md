# NORTH.md Specification

**Version:** 0.1
**Status:** Active (first public release)
**Authors:** [Viktor Berthelius](https://brthls.com) (BRTHLS)
**License:** MIT
**Date:** 2026-09-24

---

## Abstract

`NORTH.md` is a single markdown file placed at the root of a software project
that declares the project's **purpose, ambition, and precomputed trade-offs** in a
form readable by both humans and AI coding agents.

It is written to sit alongside the other context files agents already read. We
propose seeing them as a **five-layer stack** — a model, not an established
standard:

- `CONSTITUTION.md` — **limits** (non-negotiable principles and boundaries).
- `AGENTS.md` / `CLAUDE.md` — **how** agents work (build, test, environment).
- `DESIGN.md` — **look & feel** (design tokens and the rationale behind them).
- `SOUL.md` — **who** the agent is (persona, values, tone).
- `NORTH.md` — **why** and **how far** (purpose, ambition, trade-off defaults, reversibility).

---

## Motivation

Coding agents tend to default to **safe, incremental output**. They optimise for
"don't break what works" rather than "level up". When given an ambiguous task,
they choose the smaller interpretation. When proposing solutions, they suggest
patches rather than rewrites. When uncertain, they add error handling instead of
removing the failure mode at its source.

Repository-level rule files (`CLAUDE.md`, `AGENTS.md`) cover *operational* concerns:
which commands to run, which gates to respect, which conventions to follow.
Identity files (`SOUL.md`) cover *character*: the agent's voice, tone, and
values.

Neither layer answers the question that determines whether an agent ships a
**competent patch** or an **ambitious leap**:

> _Where is this project going, and how far are we willing to push to get there?_

`NORTH.md` answers that question, in seven sections, in one file.

---

## File location

`NORTH.md` MUST be placed at the repository root.

If a monorepo contains multiple distinct products, each product MAY have its own
`NORTH.md` in its package root. The root-level `NORTH.md` then describes the
umbrella ambition.

---

## File format

`NORTH.md` is a CommonMark markdown file. It SHOULD contain the seven
canonical sections defined below, in order, each as an H2 heading.

Sections MAY be omitted if not applicable, but the heading SHOULD be retained
with a brief note explaining the omission.

Additional sections MAY be added after the seven canonical ones.

---

## The seven sections

### 1. North Star

A single sentence declaring the destination. Not the roadmap. Not the next
quarter. The destination.

A well-formed North Star is:

- **Specific enough to disqualify alternatives.** "Be the best ERP" is not a
  North Star. "Replace spreadsheet bookkeeping for European freelancers by 2030" is.
- **Ambitious enough to be uncomfortable.** If the North Star feels safe, it is
  not a North Star.
- **Reachable in principle.** A North Star is not a fantasy. It is a destination
  that justifies hard choices.

> **Example.** _Arkwell makes a one-day month-end close the norm for European
> small manufacturers by 2030._

### 2. The Bar

The quality threshold that distinguishes "shipped" from "started". Defines what
work is acceptable to call done.

A well-formed Bar is:

- **Measurable or observable.** "High quality" is not a Bar. "p95 latency under
  200ms, zero type errors in CI, accessibility AA on every page" is.
- **Higher than industry default.** A Bar at industry average is no Bar at all.
- **Defended by gates.** Items in the Bar SHOULD map to enforcement: CI checks,
  linters, review rules, runbooks.

> **Example.** _Every shipped feature passes: typecheck, lint, full test suite,
> Lighthouse ≥95 on all metrics, WCAG AA via axe, and i18n parity across every
> supported locale. No exceptions, no "TODO: tests later"._

### 3. Asymmetric Bets

The places where we deliberately invest 10x effort, and the places where 1.1x is
correct.

A well-formed Asymmetric Bets section names both sides:

- **Where we go big.** What deserves disproportionate investment because it is
  load-bearing or strategically decisive.
- **Where we deliberately ship medium.** What is fine at 80% so we can spend the
  remaining capacity on the bets.

This section prevents two failure modes: over-investing in commodity work, and
under-investing in the work that compounds.

> **Example.**
> _Go 10x on: stock-to-ledger reconciliation, e-invoicing correctness,
> migration from the incumbent system._
> _Accept 1.1x on: admin settings UI, dashboard polish, internal reports._

### 4. Anti-Goals

The things we explicitly refuse to do, even when they would be easy or
profitable in the short term. Anti-Goals are how we say no without re-deciding
every week.

A well-formed Anti-Goal is:

- **Tempting.** If no one would ever ask for it, it is not an Anti-Goal.
- **Justified.** A one-line reason that survives pushback.
- **Specific.** Not "we don't do crap", but "we don't ship features that require
  external accountant review before use".

> **Example.**
> _We do not build a CRM module. (Mature CRMs exist; we integrate, we don't
> rebuild.)_
> _We do not support on-prem deployment. (Distracts from cloud-first product
> velocity.)_
> _We do not accept feature requests with no documented user pain. (Roadmap is
> pull-based, not push-based.)_

### 5. Trade-off Defaults

Decisions that have already been made about common trade-offs, written down once
so they are not re-debated each sprint.

Cover the trade-offs that come up repeatedly in your domain. Common pairs:

- Speed vs. safety
- Breadth vs. depth
- Build vs. buy
- Generality vs. fit
- Backward compatibility vs. clean design
- Single tenant vs. multi tenant

For each: name the default, and name the conditions under which the default
flips.

> **Example.**
> _Default: speed over safety on internal tooling, safety over speed on fiscal
> code. Flips: any code touching e-invoicing or payroll must pass the safety
> default regardless of internal-vs-external scope._

### 6. Ambition Triggers

Phrases — used by humans and quoted in AI agent prompts — that escalate scope
when the team is being too small.

A well-formed Ambition Trigger:

- **Is short enough to remember.**
- **Forces a specific reframe.** Not "be ambitious", but "what would the
  10x version look like".
- **Is allowed to be answered with 'this is the 10x version'.**

> **Examples.**
> _"Is there a 10x version of this?"_
> _"What would [reference team] ship here?"_
> _"If we had three weeks instead of three days, what would change?"_
> _"What's the version of this that ends up in the keynote demo?"_

### 7. Reversibility

A map of which decisions are one-way doors (expensive to reverse) and which are
two-way doors (cheap to reverse). One-way doors deserve deliberation. Two-way
doors deserve speed.

A well-formed Reversibility section lists:

- **One-way doors in this project.** Database schema changes in production,
  public API contracts, brand identity, fiscal calculation logic, security
  boundaries.
- **Two-way doors in this project.** UI copy, internal tool layout, code
  structure, dependency choices on internal tools.
- **The default disposition.** When in doubt, treat it as which.

> **Example.**
> _One-way doors: e-invoice signature format, public API response shape,
> domain name choice._
> _Two-way doors: internal admin UI, dependency on a given OSS library,
> non-public code organisation._
> _When in doubt: treat as two-way and move._

---

## Propagation (recommended)

Projects that adopt `NORTH.md` SHOULD make it discoverable:

1. **Reference it from `CLAUDE.md` / `AGENTS.md` / `SOUL.md`:**

   > See [NORTH.md](./NORTH.md) for project purpose and ambition.

2. **Mention it in the README with a badge:**

   ```markdown
   [![NORTH.md](https://northfile.dev/badge.svg)](https://northfile.dev)
   ```

3. **Keep it short.** A NORTH.md longer than two screens has lost the plot.

---

## Versioning

This specification follows [Semantic Versioning](https://semver.org).

- **MAJOR** bumps for breaking section changes.
- **MINOR** bumps for additive sections or clarifications that may change
  validator behaviour.
- **PATCH** bumps for editorial changes.

A `NORTH.md` file MAY declare the spec version it targets via an HTML comment
on the first line:

```markdown
<!-- NORTH.md spec: v0.1 -->
```

---

## Relationship to other conventions

`NORTH.md` is designed to coexist with, not replace, related conventions:

| File | Purpose | Origin |
|---|---|---|
| `README.md` | Human onboarding and public overview | Long-standing convention |
| `AGENTS.md` | Operational instructions for coding agents: build, test, conventions | [agents.md](https://agents.md), stewarded by the Agentic AI Foundation (Linux Foundation) |
| `CLAUDE.md` | Project instructions loaded by Claude Code | [Anthropic](https://code.claude.com/docs/en/memory) |
| `CONSTITUTION.md` | Non-negotiable principles and boundaries | Community conventions, e.g. [agentconstitution.dev](https://agentconstitution.dev); GitHub Spec Kit keeps a project constitution |
| `DESIGN.md` | Design tokens and the rationale behind them | [Google Labs](https://github.com/google-labs-code/design.md) |
| `SOUL.md` | The agent's persona, values, and tone | [soul.md](https://soul.md) |
| `VISION.md` | Long-term direction | No formal convention |
| `NORTH.md` | Purpose, ambition, and precomputed trade-offs | This specification |
| `llms.txt` | A site index that helps LLMs and agents use a website | [llmstxt.org](https://llmstxt.org), proposed by Jeremy Howard (2024) |

Use whichever combination fits the project. The five-layer model in the
Abstract is a proposal for how these files divide the work, not an industry
standard.

---

## Reference implementation

The specification site and template live at
**[https://northfile.dev](https://northfile.dev)**.

A comparison with related conventions lives at
**[https://northfile.dev/compare](https://northfile.dev/compare)**.

Examples — one real, five illustrative — live at
**[https://northfile.dev/examples](https://northfile.dev/examples)**.

---

## Changelog

### v0.1 — 2026-09-24

- First public release.
- Seven sections defined: North Star, The Bar, Asymmetric Bets, Anti-Goals, Trade-off Defaults, Ambition Triggers, and Reversibility.
- Trade-off Defaults name each default and the condition under which it flips.
- Proposed a five-layer model for agent context files (`CONSTITUTION.md`, `AGENTS.md`, `DESIGN.md`, `SOUL.md`, `NORTH.md`).
- Propagation guidance and an optional spec-version marker.
- Versioning policy adopted (semver).
