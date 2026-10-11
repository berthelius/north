---
title: "Stintly"
domain: "side-project"
subtitle: "A focus timer that bills clients while you work"
description: "A fictional browser-based focus timer for freelancers who bill by the hour. It pairs a focus timer with automatic time entries, sent to the user's existing time tracker through its public API or exported as CSV. Built and run by one person in spare hours, aiming for €5,000 MRR by month 12."
whyItWorks: "It is honest about what the project is: one founder, an explicit revenue target and a deliberately narrow feature set. The North Star is measurable (€5k MRR by month 12), not a vague aspiration. The anti-goals name the traps that kill side projects in particular (hiring, raising, scope creep beyond the core loop), not generic bad ideas. The trade-offs are settled for the decisions that come up when time is scarce, and the reversibility section admits that, at this size, almost everything is a two-way door."
kind: "illustrative"
order: 5
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Stintly

> Project purpose, ambition, and trade-off defaults.
> One person. Stolen hours. Real constraints.

## 1. North Star

**Ship a focus timer that freelancers pay for, reaching €5,000 MRR by month 12 — without hiring, raising or expanding beyond the core loop.**

The goal is a profitable, sustainable side project, not a startup. The month-12 target tests whether the core value proposition works; it is not a growth target.

## 2. The Bar

A feature is shippable when:

- It works end to end in Chrome and Firefox, tested by hand in each.
- At least one automated test covers the happy path.
- It does not break existing integrations (time-tracker sync, CSV export).
- The landing page describes the new capability before the feature ships.

A weekly demo (Friday, 15 minutes, recorded) is the forcing function. If a feature is not ready to demo by Friday, it waits for the next one. No exceptions.

## 3. Asymmetric Bets

**Go 10x on:**

- **The timer itself.** The core loop is start → focus → log. Every bit of friction in that loop loses a user. This is the one thing worth obsessing over.
- **Integration reliability.** If a user's time entries fail to reach their time tracker at 4 pm on a Friday, they will not come back. Integrations must be boring and correct.

**Accept 1.1x on:**

- **Settings and preferences.** Functional, not beautiful. Nobody is here for the settings page.
- **Onboarding.** Clear enough not to block the first session; no further investment until the core loop is validated.
- **Marketing site design.** One page, clearly written. No redesign until revenue data says design is the bottleneck.

## 4. Anti-Goals

- **We do not hire.** Hiring means payroll, management and a revenue requirement that changes what the project is. This is a side project; its constraints are its identity.
- **We do not raise funding.** Outside capital brings growth expectations a €5k MRR target cannot meet. If subscriptions cannot sustain the project, the project is wrong, not the funding.
- **We do not add a feature outside the core loop without removing one.** The backlog is full of good ideas. Scope creep never announces itself; it arrives as "just one more small thing". Anything beyond the core loop replaces something of similar complexity.
- **We do not build mobile apps.** The target user is at a desk with billable work open. A mobile experience solves a different problem for a different user. Revisit when this is profitable.
- **We do not build a client-facing portal.** Freelancers manage clients in their own tools. Stintly is a personal productivity tool, not client management software.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Ship vs. polish | Ship: an imperfect tool in production produces feedback; a polished unreleased one produces nothing | A bug touches billing or time-entry data; it is fixed before anything else ships |
| Breadth vs. depth | Depth in the core loop; no breadth beyond it | Three paying users cancel and name the same missing feature as the reason |
| Build vs. buy | Buy: hosted billing, a managed database with auth, managed hosting | A vendor bill passes 10% of MRR, or a vendor outage breaks the core loop twice in a quarter |
| Automated vs. manual testing | Manual for UI, automated for sync logic | The same regression happens twice; automate that exact path |
| User feedback vs. own instinct | Feedback for the timer experience; instinct for product direction | Five paying users independently ask for the same change of direction; it gets a week of serious consideration |

## 6. Ambition Triggers

- _"Would I pay €12 a month for this myself?"_
- _"If this feature disappeared, how many users would email me within a week?"_
- _"What is the version of Stintly that gets linked in every freelancer productivity thread for the next two years?"_
- _"If I had three uninterrupted days instead of scattered hours, what would I build, and is that more important than what I am building now?"_
- _"Is this a demo I would be proud to send to the mailing list?"_

## 7. Reversibility

**One-way doors — decide deliberately:**

- The sync contracts with the time trackers we integrate with. Breaking a sync breaks trust with every user who relies on it.
- Pricing structure. Moving to annual-only, or changing the free tier, resets existing users' expectations and carries real churn risk.
- The schema for stored time entries. Migration is possible, but it costs user trust if it goes wrong.

**Two-way doors — move fast:**

- Almost everything else. For a side project, a bad decision costs a week's work, not a company.
- UI layout and copy. Change freely based on what users actually say.
- Technology choices below the integration layer. Migrate when a better option appears.
- Marketing site structure. Test different framings freely.
- Feature names. Rename until something sticks.

**When in doubt:** treat it as two-way and move fast. The enemy is inertia, not imperfection.
