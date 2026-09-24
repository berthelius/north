# NORTH.md Specification

**Version:** 0.1
**Status:** Active (Canonical Public Release)
**Authors:** [Viktor Berthelius](https://brthls.com) (BRTHLS)
**License:** MIT
**Date:** 2026-09-24

---

## Abstract

`NORTH.md` is a single markdown file placed at the root of a software project
that declares the project's **purpose, ambition, and precomputed trade-offs** in a
form readable by both humans and AI coding agents.

It anchors the **5-layer agent governance stack**:

- `CONSTITUTION.md` — **limits** (safety, negative boundaries, invariant red lines).
- `AGENTS.md` / `CLAUDE.md` — **how** agents work (build, test, environment).
- `design.md` — **look & feel** (UI tokens, layout contracts, design systems).
- `SOUL.md` — **who** the product is (voice, persona, tone).
- `NORTH.md` — **why** and **how far** (purpose, ambition, trade-off defaults, reversibility).

---

## Motivation

Modern coding agents default to **safe, incremental output**. They optimise for
"don't break what works" rather than "level up". When given an ambiguous task,
they choose the smaller interpretation. When proposing solutions, they suggest
patches rather than rewrites. When uncertain, they add error handling instead of
removing the failure mode at its source.

Repository-level rule files (`CLAUDE.md`, `AGENTS.md`) cover *operational* concerns:
which commands to run, which gates to respect, which conventions to follow.
Identity files (`SOUL.md`) cover *aesthetic* and *cultural* concerns: voice, tone,
who we are.

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
  North Star. "Replace QuickBooks for European freelancers by 2027" is.
- **Ambitious enough to be uncomfortable.** If the North Star feels safe, it is
  not a North Star.
- **Reachable in principle.** A North Star is not a fantasy. It is a destination
  that justifies hard choices.

> **Example.** _Nordic ERP replaces traditional ERP software for European SMBs by
> making AI-native business management the default by 2027._

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
> Lighthouse ≥95 on all metrics, WCAG AA via axe, and i18n parity across 15
> languages. No exceptions, no "TODO: tests later"._

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
> _Go 10x on: AI-native interaction model, fiscal compliance correctness,
> onboarding under 90 seconds._
> _Accept 1.1x on: admin settings UI, legacy import UX, internal dashboards._

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
> _We do not build a CRM module. (Twenty exists; we integrate, we don't
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
> code. Flips: any code touching VeriFactu or payroll must pass the safety
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
> _One-way doors: VeriFactu signature format, public API response shape,
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

| File | Purpose | Audience |
|---|---|---|
| `README.md` | Human onboarding and public overview | Humans |
| `AGENTS.md` / `CLAUDE.md` | Operational execution, gates, and workflow | Coding agents |
| `SOUL.md` | Project identity, tone, and character | Humans + agents |
| `VISION.md` | Long-term market future and destination | Humans + planning agents |
| `CONSTITUTION.md` | Non-negotiable negative constraints | Guardrails + agents |
| `NORTH.md` | Decision arbitration, ambition, and trade-offs | Humans + agents |
| `llms.txt` | LLM-readable site index | LLM web crawlers |

An ambitious engineering project may compose all seven modularly.

---

## Reference implementation

The canonical reference and template lives at
**[https://northfile.dev](https://northfile.dev)**.

Ecosystem comparison matrix lives at
**[https://northfile.dev/compare](https://northfile.dev/compare)**.

Examples across multiple domains live at
**[https://northfile.dev/examples](https://northfile.dev/examples)**.

---

## Changelog

### v0.1 — 2026-09-24

- Canonical public specification release.
- Seven canonical sections codified: North Star, The Bar, Asymmetric Bets, Anti-Goals, Trade-off Defaults, Ambition Triggers, and Reversibility.
- Structured Trade-off Defaults table schema with explicit `Flip when` conditions.
- Distinction between Mechanical Automated Gates and Truth Assertions codified in The Bar.
- Formal 5-layer agent governance stack defined (`CONSTITUTION.md`, `AGENTS.md`, `design.md`, `SOUL.md`, `NORTH.md`).
- Versioning policy adopted (semver).
