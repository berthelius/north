---
title: "Oxbow Platform"
domain: "internal-tool"
subtitle: "Developer platform for a 200-engineer organisation"
description: "A fictional platform team of six at a 200-engineer software company. It owns the golden paths: deployment pipelines, service templates, observability defaults, incident tooling and the internal portal that ties them together. Its mandate is to cut the overhead of shipping production software, measured rather than assumed."
whyItWorks: "It anchors everything to one measurable outcome, median lead time from ticket to production, instead of a mandate like 'improve developer experience'. The Bar is observable: if a new engineer cannot ship a service through the golden path in 30 minutes, the platform has not done its job. The anti-goals confront the classic failure of platform teams, rebuilding tools that can be bought, and the trade-off table makes 'internal users tolerate rougher interfaces' an explicit default with its own flip condition."
kind: "illustrative"
order: 6
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Oxbow Platform

> Project purpose, ambition, and trade-off defaults.
> For platform architecture and golden path docs, see the internal wiki.
> For on-call runbooks, see `runbooks/`.

## 1. North Star

**Cut the median (P50) time from ticket created to production deployment to under two days by the end of 2027, and keep it there.**

The platform team does not ship user-facing features. It ships the conditions under which 200 engineers ship them faster and more safely. Median lead time is how we know whether those conditions exist.

## 2. The Bar

A platform tool or golden path is shippable when:

- An engineer in their first week can follow the golden path from nothing to a deployed production service in under 30 minutes, without asking for help.
- The tool has a runbook, not a README, covering its three most likely failure modes in production.
- Observability is on by default. A service bootstrapped through the golden path emits traces, structured logs in the organisation's format and a health-check endpoint, with no configuration.
- The change has been used by at least one real service team before it is announced to everyone. Dogfooding is not optional.
- Its effect on lead time is estimated before release and measured after. If it cannot be measured, the tool does not graduate from experimental.

## 3. Asymmetric Bets

**Go 10x on:**

- **Observability.** Being able to answer "why is this broken?" in under five minutes multiplies every team's speed. Tracing, structured logging and alerting defaults deserve more investment than any interface improvement.
- **Golden path adoption.** A golden path that 40% of teams use is worth less than one that 90% use and trust. Adoption depends on the path handling real edge cases, not just the happy path. Invest here.
- **Incident tooling.** An hour of incident costs more than almost any other hour of engineering. Cutting time to recovery by 20% is worth more than adding 20 points to a developer satisfaction survey.

**Accept 1.1x on:**

- **Portal polish.** Internal users tolerate functional interfaces. A rough portal that engineers actually use beats a beautiful one they avoid.
- **Non-critical migrations.** Moving every service from one logging library to another is correct in theory and a distraction in practice while the current library works.
- **Documentation breadth.** A runbook for the top three failure modes beats a comprehensive wiki that nobody reads during an incident.

## 4. Anti-Goals

- **We do not build bespoke tooling when a product already solves the problem.** Mature products exist for paging, monitoring, feature flags and CI. Rebuilding them internally costs engineers for years and produces a worse result. The question is whether the bought tool fits; if it does, buy it.
- **We do not drive adoption through mandatory migrations.** Deadlines to move to a new golden path breed resentment and rushed, buggy migrations. Golden paths are pulled by value, not pushed by mandate.
- **We do not do other teams' feature work.** When a service team asks for a custom integration only they need, the answer is a supported pattern they can implement themselves.
- **We do not build for the organisation we wish we had.** Decisions are made for 200 engineers and the services they run today, not for 2,000 engineers or the architecture we wish had been chosen three years ago.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Build vs. buy | Buy: evaluate products first | Licence and integration costs exceed one engineer a year, or leaving the vendor would take more than a quarter; then build, or choose an open-source option |
| Reliability vs. features | Reliability: an outage in platform tooling stops the whole engineering organisation | A missing feature is blocking a team from adopting the golden path |
| Mandated vs. voluntary adoption | Voluntary: golden paths win because they are better, not because they are required | A security or compliance requirement makes the old path unacceptable; mandate it, with a hard date and migration support |
| Interface polish vs. functionality | Functionality: engineers use tools that work, not tools that look good | A usability problem is blocking adoption, and teams are building workarounds instead of using the platform |
| Measurement vs. intuition | Measurement: no platform change ships without a before-and-after metric | The change is an obvious reliability fix with no plausible path to regression |

## 6. Ambition Triggers

- _"If a new engineer joined today and followed this path, would they have a production service running by lunch?"_
- _"What is the version of this that works at 3 am with a junior engineer on call?"_
- _"If we removed this tool tomorrow, which teams would notice within 48 hours, and is that the right set of teams?"_
- _"What would the version of this look like that our engineers bring up, unprompted, in hiring interviews?"_
- _"If median lead time is still two weeks in six months, which of our bets was wrong?"_

## 7. Reversibility

**One-way doors — decide deliberately:**

- Technology choices that services build on through the golden path. If the path defaults to a particular service mesh or logging pipeline, moving away affects every service that adopted it.
- On-call structure and escalation paths. Changing them carelessly leaves gaps in coverage.
- Vendor contracts worth more than a quarter's spend. Price the exit before signing.
- The observability data schema. Renaming structured log fields breaks dashboards and alerts across the organisation.

**Two-way doors — move fast:**

- Portal layout and navigation.
- Internal documentation structure.
- Which metrics appear on the lead time dashboard.
- Experimental golden paths that are not yet widely adopted.
- Service template names and default configurations, before adoption.

**When in doubt:** treat it as two-way. A platform team that moves slowly loses the organisation's trust faster than one that makes a mistake and fixes it.
