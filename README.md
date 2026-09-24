<!-- ────────────────────────────────────────────────────────────
     NORTH.md · Canonical Specification & Reference Repository
     hero art: /assets/hero-{dark,light}.svg
──────────────────────────────────────────────────────────── -->

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://northfile.dev/assets/hero-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://northfile.dev/assets/hero-light.svg">
  <img alt="NORTH.md — Give your AI coding agents judgment when the prompt runs out" src="https://northfile.dev/assets/hero-dark.svg" width="100%">
</picture>

<p align="center">
  <em>Give your AI coding agents judgment when the prompt runs out.</em><br>
  <sub>A single markdown file declaring purpose, ambition, and precomputed trade-offs to scale autonomous agency without drift.</sub><br>
  <sub>◇ &nbsp;The direction and arbitration layer of the modern agent stack.</sub>
</p>

<p align="center">
  <a href="https://northfile.dev/spec"><img src="https://img.shields.io/badge/SPEC-v0.1_Canonical-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="Spec v0.1"></a>
  &nbsp;
  <a href="https://northfile.dev/compare"><img src="https://img.shields.io/badge/Stack-5--Layer_Governance-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="5-Layer Governance"></a>
  &nbsp;
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="License"></a>
  &nbsp;
  <a href="https://northfile.dev"><img src="https://img.shields.io/badge/Web-northfile.dev-161b22?style=flat-square&labelColor=161b22&color=B8895B" alt="Website"></a>
</p>

<br>

<h3 align="center">◇ &nbsp;T H E &nbsp; P R O B L E M</h3>

Coding agents in 2026 can write 2,000 lines of syntactically valid code in thirty seconds. But when given a task that touches multiple files or architecture, **they default to conservative mediocrity**:

* They pick the easiest dependency rather than the architectural invariant.
* They write boilerplate around problems instead of refactoring the root cause.
* They ask *"Should I do X or Y?"* on every ambiguous edge case, stalling autonomous workflows.
* Or, running in overnight background mode (`/goal`, Jules, Devin), they suffer from **Agentic Drift** — solving the immediate prompt while violating the project's unspoken engineering standards.

`AGENTS.md` and `CLAUDE.md` tell agents **how** to build, test, and run.  
`SOUL.md` tells agents **who** the product is (voice and persona).  
`design.md` tells agents **what** tokens, layouts, and components to construct.  
`CONSTITUTION.md` tells agents **what** is forbidden.

**Nothing tells them why the project exists, how far to go, and which trade-off to pick when two valid engineering choices collide.**

`NORTH.md` fills this exact vacuum.

<br>

<h3 align="center">◇ &nbsp;T H E &nbsp; 5 - L A Y E R &nbsp; A G E N T &nbsp; S T A C K</h3>

`NORTH.md` is modular. It does not replace operational or safety instructions; it anchors them:

| Layer | File Standard | Primary Custodian | Question it Answers |
|:---:|---|---|---|
| **5** | **`NORTH.md`** | **BRTHLS** | **Why & How Far:** Purpose, quality bar, ambition triggers, and precomputed trade-offs. |
| **4** | `SOUL.md` | Community / Open Source | **Who:** Voice, persona, empathetic tone toward the end user. |
| **3** | `design.md` | Google Material / Antigravity | **Look & Feel:** UI tokens, responsive grids, and design system contracts. |
| **2** | `AGENTS.md` / `CLAUDE.md` | Linux Foundation (Agentic AI) | **How:** Build scripts, test runners, linter invocations, and workspace paths. |
| **1** | `CONSTITUTION.md` | Anthropic / Safety Alignment | **Limits:** Hard negative boundaries, data privacy, and forbidden operations. |

> See **[northfile.dev/compare](https://northfile.dev/compare)** for the complete comparison matrix and boundary definitions.

<br>

<h3 align="center">◇ &nbsp;T H E &nbsp; S E V E N &nbsp; S E C T I O N S</h3>

A valid `NORTH.md` is a single file placed at the root of your repository consisting of seven canonical sections:

```markdown
<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Project Name

> Project purpose, ambition, and precomputed trade-off defaults.
> For how to run, see AGENTS.md. For design tokens, see design.md.

## 1. North Star
One falsifiable sentence declaring the destination. Disqualifies wrong moves immediately.

## 2. The Bar
The non-negotiable definition of "done". Separates mechanical gates (Lighthouse, typecheck, coverage)
from truth assertions (zero speculative abstractions).

## 3. Asymmetric Bets
Where to invest 10x effort, and where 1.1x is deliberately correct. Prevents over-investing
in commodity work while under-investing in what compounds.

## 4. Anti-Goals
Explicit written refusals of profitable or tempting features that are intentionally rejected.
Every refusal must carry a crisp justification.

## 5. Trade-off Defaults
A structured decision table answering common dilemmas with explicit "Flip when" triggers:

| Trade-off | Default | Flip when |
|---|---|---|
| Correctness vs. speed | Formal verification on financial core | Prototyping ephemeral UI widgets |
| Build vs. buy | Buy standard infra (Postgres, Sentry) | Unit economics degrade at >10k req/s |
| Spec depth vs. breadth | Depth on 7 canonical sections | Community RFC proves a new failure mode |

## 6. Ambition Triggers
Provocative questions an agent evaluates before concluding a task:
- "Does this change give agents judgment when the prompt runs out, or just more instructions?"
- "Would Linear, Stripe, or Vercel ship this surface?"
- "If we had three more days, what would change — and why aren't we doing it now?"

## 7. Reversibility
Classification of decisions into one-way doors (stopping for human review)
vs. two-way doors (executing autonomously with zero blocker).
```

<br>

<h3 align="center">◇ &nbsp;I N S T A N T &nbsp; I N T E G R A T I O N</h3>

Add this snippet to your `CLAUDE.md`, `AGENTS.md`, or `.cursorrules` to instruct coding agents to consult `NORTH.md`:

```markdown
## Strategic Direction & Trade-off Arbitration
Before making architectural decisions, choosing dependencies, or concluding refactors,
consult [NORTH.md](./NORTH.md).
- Adhere to the non-negotiables in "The Bar".
- Reject features listed in "Anti-Goals".
- When facing architectural dilemmas, execute the precomputed choice in "Trade-off Defaults".
  Do not flip a default unless the documented "Flip when" condition is met.
- For two-way doors ("Reversibility"), execute autonomously; do not stop to ask permission.
```

<br>

<h3 align="center">◇ &nbsp;A D O P T E R &nbsp; B A D G E</h3>

Signal that your project scales agency with precomputed judgment:

```markdown
[![north.md](https://northfile.dev/badge.svg)](https://northfile.dev)
```

```html
<a href="https://northfile.dev"><img src="https://northfile.dev/badge.svg" alt="north.md v0.1"></a>
```

<br>

<h3 align="center">◇ &nbsp;M A C H I N E - R E A D A B L E &nbsp; E N D P O I N T S</h3>

Designed for direct ingestion by LLM crawlers, context windows, and autonomous agents:

* **Raw Markdown:** [`https://northfile.dev/spec.md`](https://northfile.dev/spec.md)
* **LLM Index:** [`https://northfile.dev/llms.txt`](https://northfile.dev/llms.txt)
* **Full Context Dump:** [`https://northfile.dev/llms-full.txt`](https://northfile.dev/llms-full.txt)
* **JSON Schema:** [`https://northfile.dev/api/spec/v0.1.json`](https://northfile.dev/api/spec/v0.1.json)
* **Discovery Pointer:** [`https://northfile.dev/.well-known/llms.json`](https://northfile.dev/.well-known/llms.json)

<br>

<h3 align="center">◇ &nbsp;A U T H O R &nbsp; &amp; &nbsp; L I C E N S E</h3>

Created by **[Viktor Berthelius](https://brthls.com)** ([BRTHLS](https://brthls.com)).  
An autonomous, vendor-neutral initiative for engineering teams working with AI agents.

Released under the **[MIT License](LICENSE)**.
