---
title: "Stintly"
domain: "side-project"
subtitle: "A focus timer that bills clients while you work"
description: "Stintly is a browser-based focus timer built for freelancers who bill by the hour. It combines a Pomodoro-style timer with automatic time-entry creation in the user's existing time tracker (through its public API) or a plain CSV export. Built and maintained by one person in stolen hours. Revenue goal: €5,000 MRR by month 12."
whyItWorks: "This NORTH.md works because it is honest about what the project is: a side project with a solo founder, an explicit revenue target, and a narrow feature surface by design. The North Star is measurable (€5k MRR, month 12), not a vague aspiration. The anti-goals name the traps that kill side projects specifically — hiring, raising, scope creep beyond the core loop — not generic bad things. The trade-off defaults are precomputed for the actual decisions that come up when time is scarce and energy is finite. The reversibility section acknowledges that for a side project, almost everything is a two-way door."
kind: "illustrative"
order: 5
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Stintly

> Project purpose, ambition, and trade-off defaults.
> One person. Stolen hours. Real constraints.

## 1. North Star

**Ship a focus timer that freelancers pay for, reaching €5,000 MRR by month 12 — without hiring, raising, or expanding beyond the core loop.**

The goal is a profitable, sustainable side project, not a startup. The month 12 target is the test of whether the core value proposition works, not a growth target.

## 2. The Bar

A feature is shippable when:

- It works end-to-end in Chrome and Firefox, tested manually on each.
- It has at least one automated test covering the happy path.
- It does not break existing integrations (time-tracker sync, CSV export).
- The landing page copy reflects the new capability before the feature ships.

A weekly demo (Friday, 15 minutes, recorded) is the forcing function. If a feature is not ready to demo by Friday, it waits for the next week. No exceptions.

## 3. Asymmetric Bets

**Go 10x on:**

- **The timer experience itself.** The core loop is start → focus → log. Every pixel of friction in that loop is a user lost. This is the one thing worth obsessing over.
- **Integration reliability.** If a user's time entries fail to sync to their time tracker at 4pm on a Friday, they will not return. Integrations must be boring and correct.

**Accept 1.1x on:**

- **Settings and preferences UI.** Functional, not beautiful. Users are not here for the settings page.
- **Onboarding flow.** Clear enough to not block the first session; no further investment until the core loop is validated.
- **Marketing site design.** One page, clearly written, no redesign until there is revenue data suggesting design is the bottleneck.

## 4. Anti-Goals

- **We do not hire.** Hiring means payroll, management overhead, and a revenue requirement that changes the project's nature. This is a side project; its constraints are its identity.
- **We do not raise funding.** External capital introduces growth expectations that cannot be satisfied by a €5k MRR target. If the project cannot sustain itself on subscriptions, the project is wrong, not the capitalisation.
- **We do not add features outside the core loop without removing something.** The backlog is full of good ideas. Scope creep does not announce itself; it arrives as "just one more small thing". Features beyond the core loop require removing a feature of equal complexity.
- **We do not support mobile apps.** The target user is at a desk with billable work open. A mobile experience solves a different problem for a different user. Build that when this is profitable.
- **We do not build a client-facing portal.** Freelancers manage client relationships in their own tools. Stintly is a personal productivity tool, not a client management system.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Ship vs. polish | Ship — an imperfect tool in production produces user feedback; a polished unreleased tool produces nothing | A bug affects billing data correctness — that always gets fixed before ship |
| Feature breadth vs. depth | Depth in the core loop; no breadth beyond it | A feature outside the core loop has been requested by five paying users in two weeks |
| Build vs. buy | Buy (Stripe for billing, Supabase for auth and data, Vercel for hosting) | A paid dependency costs more than two hours of migration work per month |
| Automated vs. manual testing | Manual for UI, automated for integration sync logic | A regression has occurred twice — then automate that exact path |
| User feedback vs. own instinct | User feedback for the timer UX; own instinct for product direction | They diverge — trust the data for UX, own instinct for what the product should become |

## 6. Ambition Triggers

- *"Would I pay €12 a month for this myself?"*
- *"If this feature were removed, how many users would email me within a week?"*
- *"What is the version of Stintly that gets linked in every freelancer productivity thread for the next two years?"*
- *"If I had three uninterrupted days instead of scattered hours, what would I build — and is that more important than what I am building now?"*
- *"Is this the weekly demo I am proud to send to the mailing list?"*

## 7. Reversibility

**One-way doors — decide deliberately:**

- The sync contracts with the time trackers we integrate with. Breaking a sync integration ends the relationship with every user who relies on it.
- Pricing structure. Moving from monthly to annual-only, or changing the free tier, affects existing users' expectations and has real churn risk.
- The data schema for time entries stored locally. Migration is possible but costs user trust if it goes wrong.

**Two-way doors — move fast:**

- Almost everything else. For a side project, the cost of a bad decision is a week's work, not a company.
- UI layout and copy — change freely based on what users actually say.
- Tech stack decisions below the integration layer — migrate when a better option appears.
- Marketing site structure — test different framings freely.
- Feature naming — rename until something sticks.

**When in doubt:** treat as two-way and move fast. The enemy is inertia, not imperfection.
