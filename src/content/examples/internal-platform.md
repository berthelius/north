---
title: "Foundry Platform"
domain: "internal-tool"
subtitle: "Developer platform for a 200-engineer engineering org"
description: "Foundry is the internal developer platform team at a 200-engineer software company. The team of six owns the golden paths: deployment pipelines, service templates, observability defaults, incident tooling, and the internal portal that surfaces all of it. Their mandate is to reduce the cognitive overhead of shipping production software — measured, not assumed."
whyItWorks: "This NORTH.md works because it anchors everything to a measurable outcome (P50 ticket lead time) rather than a vague mandate like 'improve developer experience'. The Bar is observable: if a new service cannot be bootstrapped in under 30 minutes using the golden path, the platform has not done its job. The anti-goals confront the most common failure mode of internal platform teams — building bespoke tooling for problems that paid products already solve — and the trade-off table makes the 'internal users tolerate rougher UI' default explicit rather than implicit."
order: 5
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Foundry Platform

> Project purpose, ambition, and trade-off defaults.
> For platform architecture and golden path docs, see the internal wiki.
> For on-call runbooks, see `runbooks/`.

## 1. North Star

**Reduce the P50 time from a ticket being created to a production deployment to under two days by the end of the year — and keep it there.**

The platform team does not ship user-facing features. It ships the conditions under which 200 engineers can ship user-facing features faster and more safely. The P50 lead time metric is the proxy for whether those conditions exist.

## 2. The Bar

A platform tool or golden path is shippable when:

- A new engineer on their first week can follow the golden path from zero to a deployed production service in under 30 minutes, without asking for help.
- The tool has a runbook — not a README — covering the three most likely failure modes in production.
- Observability is default-on. A service bootstrapped via the golden path emits traces, logs structured to the org standard, and a health check endpoint, without any configuration.
- The change has been tested on at least one real service team before announcing to the org. Dog-fooding is not optional.
- Lead time impact is estimated before ship and measured after. If no measurement is possible, the tool does not graduate from experimental.

## 3. Asymmetric Bets

**Go 10x on:**

- **Observability.** The single biggest multiplier on engineering velocity is being able to answer "why is this broken?" in under five minutes. Tracing, structured logging, and alerting defaults are worth more investment than any UX improvement.
- **Golden path adoption.** A golden path that 40% of teams use is less valuable than one that 90% of teams use and trust. Adoption requires that the path handles real-world edge cases, not just the happy path. Invest here.
- **Incident tooling.** An incident costs the org more per hour than almost any other engineering state. Reducing MTTR by 20% is more valuable than improving developer happiness survey scores by 20 points.

**Accept 1.1x on:**

- **Portal UI polish.** Internal users tolerate functional interfaces. A platform portal with a rough UI that engineers actually use beats a beautiful portal they avoid.
- **Non-critical migrations.** Migrating all services from one logging library to another is theoretically correct and practically a distraction if the current library is functional.
- **Docs comprehensiveness.** A runbook for the top three failure modes is more useful than a comprehensive wiki that no one reads during an incident.

## 4. Anti-Goals

- **We do not build bespoke tooling when a paid platform solves the problem.** PagerDuty, Datadog, LaunchDarkly, and Buildkite exist. Replacing them with internal tools costs three engineers for a year and produces a worse result. The evaluation is: does the paid tool fit? If yes, buy it.
- **We do not gate adoption with mandatory migrations.** Requiring teams to migrate to a new golden path before a deadline creates resentment and produces rushed, buggy migrations. Golden paths are pulled by value, not pushed by mandate.
- **We do not own product feature work.** The platform team is not a feature team for other teams' features. When a service team asks for a custom integration that only their team needs, the answer is a supported pattern they can implement themselves.
- **We do not build for the org we want to have.** Platform decisions are made for 200 engineers and the actual services they run today. Not for 2,000 engineers or the microservices architecture we wish they had adopted three years ago.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Build vs. buy | Buy — always evaluate paid solutions first | A paid solution costs more than one engineer's time to maintain, or introduces a vendor lock-in that would cost more than one quarter to reverse |
| Reliability vs. features | Reliability — an outage in platform tooling has a blast radius of the entire engineering org | A feature blocks adoption of the golden path by a team that would otherwise ship faster |
| Adoption pressure vs. voluntary uptake | Voluntary — golden paths are worth adopting because they are better, not because they are required | A security or compliance requirement makes the old path non-compliant — mandate with a hard date and migration support |
| Internal UI polish vs. functionality | Functionality — engineers use tools that work correctly, not tools that look good | A UX problem is blocking adoption (i.e., teams are building workarounds rather than using the platform) |
| Measurement vs. intuition | Measurement — no platform change ships without a before/after metric | A change is an obvious reliability improvement with no plausible regression path |

## 6. Ambition Triggers

- *"If a new engineer joined today and followed this path, would they have a production service running by lunch?"*
- *"What is the incident response version of this that works at 3am with a junior engineer on call?"*
- *"If we removed this tool tomorrow, which teams would notice within 48 hours — and is that the right set of teams?"*
- *"What would the version of this look like that the engineering org actually brags about in interviews?"*
- *"If P50 lead time is still two weeks in six months, what is the one thing we built that was the wrong bet?"*

## 7. Reversibility

**One-way doors — decide deliberately:**

- Golden path technology choices that services build on. If the golden path defaults to a specific service mesh or logging pipeline, migrating away from it affects every service that adopted the path.
- On-call structure and escalation paths — changing these mid-incident risks gaps in coverage.
- External vendor contracts above one quarter's cost — evaluate exit costs before signing.
- Observability data schema — changing structured log field names breaks dashboards and alerts across the org.

**Two-way doors — move fast:**

- Portal UI and navigation structure.
- Internal documentation structure.
- Which metrics appear on the engineering lead time dashboard.
- Experimental golden paths not yet widely adopted.
- Internal service template names and default configurations before adoption.

**When in doubt:** treat as two-way. An internal platform team that moves slowly loses the trust of the engineering org faster than one that makes and fixes a mistake.
