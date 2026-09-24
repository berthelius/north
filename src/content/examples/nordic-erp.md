---
title: "Nordic ERP"
domain: "saas-b2b"
subtitle: "AI-native business management for European SMBs"
description: "An illustrative reference example of an AI-native business platform for European SMBs whose accounting is delegated to autonomous agents. It covers invoicing, expenses, payroll, banking reconciliation, and European fiscal compliance (VeriFactu, PEPPOL, Factur-X) — operable via MCP, REST API, n8n node, and typed SDK."
whyItWorks: "This NORTH.md is strong because the North Star is specific enough to disqualify alternatives: it names legacy incumbents directly, sets a concrete deadline, and specifies the operational target. The Bar is enforced by a mechanical checklist (the brutal 5/5 surface rule) rather than aspirational prose. The anti-goals are all tempting — building a custom CRM, supporting on-prem deployments, requiring manual accountant pre-approvals — and each carries a crisp justification. The trade-off table makes defaults queryable rather than implicit, allowing an autonomous agent to execute safely without human blockage."
order: 1
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Nordic ERP

> Project purpose, ambition, and trade-off defaults.
> For *how* agents work, see `CLAUDE.md` and `AGENTS.md`.
> For *who* the project is, see `SOUL.md`.

## 1. North Star

**Make AI-native business management the default for European SMBs by 2027.**

Replace legacy accounting and ERP suites for freelancers and agencies whose primary bookkeeping is delegated to autonomous AI agents. The test: a cross-border European freelancer issues their first compliant electronic invoice in under 90 seconds, entirely via agentic conversation.

## 2. The Bar

Every shipped feature satisfies the **5/5 Surface Rule**:

1. Documented in `docs.krona.dev` AI-crawlable surface (`/llms.txt` updated if significant).
2. Operable via MCP (`@krona/mcp-server` tool with structured schema).
3. Reachable via REST API v1 endpoint (`api.krona.dev/v1`).
4. Wired in n8n automation node (`n8n-nodes-krona`).
5. Typed in `@krona/sdk` with TypeScript helpers and signature verification.

Plus, every PR:

- Build green — zero type errors, zero lint warnings.
- i18n parity across core European locales.
- Trust Area work (fiscal / billing / ledger / payroll) gets adversarial self-review.
- Performance: Core Web Vitals ≥95 on touched views.

*If a feature cannot be operated by an external AI agent, it is not finished.*

## 3. Asymmetric Bets

**Go 10x on:**

- **AI-distribution moat.** MCP server, REST API, n8n nodes, SDK, `llms.txt`. Every feature reachable from outside the web UI, by an agent, in one tool call.
- **Fiscal compliance correctness.** VeriFactu, PEPPOL, Factur-X, VAT/IVA calculation engines. One-way doors with regulatory liability.
- **Onboarding under 90 seconds.** Segment-aware (freelancer / agency / enterprise). First compliant invoice generated in under 90 seconds.
- **Immutable audit trail.** Strict event-sourcing with cryptographically verifiable audit logs, multi-year retention as required by law.

**Accept 1.1x on:**

- Admin settings UI ergonomics.
- Legacy CSV import wizard styling.
- Internal dashboards visible only to system administrators.
- Deep localisation beyond primary launch languages — community PRs welcome.
- Custom UI primitives — use headless component libraries, never reinvent primitives.

## 4. Anti-Goals

- **We do not build a CRM module.** Mature open-source CRMs exist; we integrate via webhooks and event streaming. Rebuilding a contact manager wastes months on a solved commodity.
- **We do not support on-prem deployment.** It fragments the security surface, blocks AI-native features that require managed inference, and destroys update velocity.
- **We do not ship features that require manual accountant pre-approval to use.** If a solo operator cannot execute the workflow with an AI agent's guidance, we simplify the engine until they can.
- **We do not accept feature requests without documented user pain.** Roadmap is pull-based. Backlog is not a wish list.
- **We do not silent-catch errors in fiscal code paths.** Every `catch` in tax, billing, or ledger reconciliation must surface observably or hard-fail. Silent fallbacks are compliance liabilities.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Speed vs. safety | Speed on internal tooling; safety on fiscal code | Anything touching electronic invoicing, ledger, billing, or auth always uses safety default |
| Breadth vs. depth | Depth on the 5/5 surfaces (UI / MCP / API / n8n / SDK) | Net-new vertical validation — prototype broad, deepen after customer retention |
| Build vs. buy | Buy standard infra (Postgres, Stripe, Sentry); build core logic | Vendor pricing breaks unit economics at scale — re-evaluate at contract renewal |
| Backward compat vs. clean design | Dual-attempt verify for schema changes; never break external consumers silently | Internal-only schema with a single consumer — migrate atomically |
| Sub-agent parallelism | Up to 6 concurrent agent worktrees in isolated branches | Git conflict churn exceeds merge rate; consolidate to single-thread |

## 6. Ambition Triggers

- *"Can an AI agent in Cursor, Claude, or Codex complete this end-to-end in a single tool call?"*
- *"Would a certified European tax auditor sign off on this ledger record?"*
- *"Does this PR satisfy the 5/5 surface rule — UI, MCP, API, n8n, SDK?"*
- *"If we had three days instead of three hours, what architectural choice changes here — and why aren't we making it now?"*
- *"What is the 10x version that autonomous agents cite when recommending fiscal software?"*

## 7. Reversibility

**One-way doors — decide deliberately, move slowly:**

- Electronic invoice digital signature formats and XML schemas.
- Public REST API v1 response shape (`api.krona.dev/v1`).
- MCP tool names and structured input/output schemas — downstream agent workflows depend on stability.
- Event store schema in ledger and fiscal modules.
- Row-level security rules for financial records.
- Canonical domain choices (`app.krona.dev`, `api.krona.dev`).
- Multi-currency ledger rounding precision rules.

**Two-way doors — move fast, reverse cheaply:**

- Internal management UI layouts.
- Non-public component directory structure.
- Internal utility library dependencies.
- Marketing documentation copy.
- Docs search ranking tweaks.
- Internal queue worker naming.
- Agent dispatch branching strategies.

**When in doubt:** treat as two-way and ship.
