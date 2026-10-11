---
title: "Arkwell"
domain: "saas-b2b"
subtitle: "Cloud ERP for European small manufacturers"
description: "A fictional cloud ERP for small European manufacturers and wholesalers: stock, purchasing, invoicing and the general ledger in one system, with e-invoicing to the EN 16931 standard. Its NORTH.md is built around one measurable outcome: closing the month in a day."
whyItWorks: "The North Star names a measurable outcome (a one-day month-end close) for a narrow segment, which rules out chasing every small business at once. The Bar ties each claim to a gate: balanced postings, schema validation, locale parity, a latency budget. The anti-goals are things customers really do ask for (a CRM, on-prem installs, custom forks), each with a one-line reason. Every trade-off names the condition that flips it, so an agent can settle most disagreements without a meeting."
kind: "illustrative"
order: 2
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Arkwell

> Project purpose, ambition, and trade-off defaults.
> For *how* agents work, see `AGENTS.md`.

## 1. North Star

**Make a one-day month-end close the norm for European small manufacturers by 2030.**

A 20-person workshop should close its books the day after month end, with stock, purchases and sales already reconciled to the ledger. If month end still needs a week of spreadsheet work, we have not finished.

## 2. The Bar

Every change that reaches `main`:

- Keeps the ledger balanced. Every posting is double-entry and idempotent, and a property test checks that debits equal credits.
- Validates e-invoice output against the EN 16931 rules in CI, across the full fixture set. One validation failure blocks the release.
- Passes typecheck, lint and the full test suite with zero warnings.
- Ships every user-facing string in every supported locale. A missing key fails the build.
- Holds p95 under 300 ms on stock, invoice and ledger screens, measured against a 50,000-item fixture catalogue.
- Comes with a release note a bookkeeper can read. If we cannot explain it to them, it is not done.

## 3. Asymmetric Bets

**Go 10x on:**

- **Stock-to-ledger reconciliation.** Every goods receipt, shipment and stock adjustment posts to the ledger automatically, and mismatches surface the same day.
- **E-invoicing correctness.** EN 16931, PEPPOL BIS and Factur-X output that validates first time. These formats carry legal weight and are one-way doors.
- **Migration from the incumbent system.** Importing two years of history, opening balances and the item master in an afternoon is what wins the switch.
- **Audit trail.** Postings are append-only. Corrections are reversing entries, never edits.

**Accept 1.1x on:**

- Admin settings UI.
- Dashboard polish and chart styling.
- Internal reports seen only by our own staff.
- Locales beyond the launch markets; community translations are welcome.

## 4. Anti-Goals

- **We do not build a CRM.** Mature CRMs exist; we sync customers and orders through the API instead of rebuilding contact management.
- **We do not offer on-prem installs.** One deployment target keeps security patches and e-invoicing rule updates same-day for every customer.
- **We do not maintain customer-specific forks.** Variation lives in configuration and extensions, or it does not ship.
- **We do not swallow errors in posting code.** Every failure in tax, invoicing or ledger paths reaches the user or halts the job.
- **We do not build features without a documented user problem.** The roadmap is pull-based.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Speed vs. safety | Safety on anything that posts to the ledger; speed on internal tooling | An internal tool starts writing ledger or tax data; it inherits the safety default |
| Build vs. buy | Buy infrastructure (database, payments, error tracking); build accounting and stock logic | A vendor's price or terms break unit economics |
| Breadth vs. depth | Depth in manufacturing and wholesale | Three lost deals in a quarter cite the same missing feature for another segment |
| Backward compatibility vs. clean design | Version the public API; never break an integration silently | The endpoint is internal and has a single consumer |
| Generality vs. fit | Fit for small manufacturers | A configuration option covers the next segment without new code paths |

## 6. Ambition Triggers

- _"Would this still close the month in a day for a customer with ten times the volume?"_
- _"Would an auditor accept this record without a follow-up question?"_
- _"Can the customer do this without calling their accountant?"_
- _"If we had three weeks instead of three days, what would we build — and why not now?"_

## 7. Reversibility

**One-way doors — decide deliberately:**

- E-invoice formats and signature handling.
- Public API v1 response shapes (`api.arkwell.example/v1`).
- Ledger posting schema and rounding rules.
- Row-level access rules for financial records.
- The product domain (`arkwell.example`).

**Two-way doors — move fast:**

- Admin UI layout.
- Internal module structure.
- Choice of internal libraries.
- Help-centre copy.

**When in doubt:** if it touches posted data, treat it as one-way; otherwise treat it as two-way and ship.
