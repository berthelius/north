# Contributing to NORTH.md

Thank you for considering a contribution. Three kinds are welcome:

1. **Example NORTH.md files** for [northfile.dev/examples](https://northfile.dev/examples).
2. **Editorial improvements** to the specification text (`SPEC.md`).
3. **Landing site and tooling** improvements to `northfile.dev`.

---

## Examples (lowest friction)

Open a pull request adding `src/content/examples/<slug>.md`. The body is the
`NORTH.md` itself; the frontmatter describes it:

```yaml
---
title: "Project name"
domain: "saas-b2b" # open-convention | saas-b2b | oss-library | agency | side-project | internal-tool
subtitle: "One line on what the project is"
description: "Two or three sentences of context."
whyItWorks: "What makes this NORTH.md a useful example."
kind: "real" # real = a file in use, reproduced verbatim; illustrative = fictional
order: 7
---
```

Guidelines:

- Use all seven sections.
- Keep it concrete. Avoid abstract aspirations.
- Two-screen maximum.
- Mark it `kind: "real"` only if the file is in use in a project you can
  link to. Otherwise it is `illustrative`, and its description starts with
  "A fictional".
- Do not present a real company as a user of NORTH.md unless it has agreed
  to be named.

We curate the examples for breadth across domains. If a domain is already well
represented, your example may be linked rather than included.

---

## Specification changes

The specification is the load-bearing artefact. Changes follow an RFC process:

1. Open an issue before opening a pull request.
2. State which section is affected and the proposed wording change.
3. State the version bump (`PATCH`, `MINOR`, or `MAJOR`).
4. State whether adopters will need to migrate their files.

`MAJOR` changes should be rare. They need broad agreement and a migration path
for existing files.

---

## Landing and tooling

Improvements to design, copy, accessibility, performance, SEO and
readability for LLMs are welcome. Quality bar:

- Lighthouse 100 across the four metrics on every page touched.
- Zero WCAG AA violations via `axe-core`.
- No new third-party JavaScript without explicit justification.
- No telemetry that identifies users.

---

## Code of conduct

Be kind. Assume good faith. Disagree without dismissing. NORTH.md is meant to
sit alongside `AGENTS.md`, `CLAUDE.md`, `SOUL.md`, `DESIGN.md` and the rest,
not to compete with them — that applies to contributors here too.

---

## Licence

By contributing, you agree that your contribution is released under the
MIT License (see `LICENSE`).
