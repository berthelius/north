# Contributing to NORTH.md

Thanks for considering a contribution. The NORTH.md project welcomes three
kinds of contribution:

1. **Example NORTH.md files** for `/examples`.
2. **Editorial improvements** to the specification text (`SPEC.md`).
3. **Landing site and tooling** improvements to `northfile.dev`.

---

## Examples (lowest friction)

Open a PR adding a new file to `/examples/<your-project>.md` containing a real
or representative `NORTH.md` from your project.

Guidelines:

- Use all seven canonical sections.
- Keep it concrete. Avoid abstract aspirations.
- Two-screen maximum.
- Add a short header comment naming the project domain (SaaS, OSS, agency,
  internal tool, side project, etc).

We curate `/examples` for breadth across domains. If a domain is already well
represented, your example may be linked rather than included.

---

## Specification changes

The specification is the load-bearing artefact. Changes follow an RFC process:

1. Open a discussion before opening a PR.
2. State which section is affected and the proposed wording change.
3. State the version bump (`PATCH`, `MINOR`, or `MAJOR`).
4. State whether adopters will need to migrate their files.

`MAJOR` changes are vanishingly rare and require strong consensus.

---

## Landing and tooling

Visual, copy, accessibility, performance, AIO, and SEO improvements are
welcome. Quality bar:

- Lighthouse 100 across the four metrics on every page touched.
- Zero WCAG AA violations via `axe-core`.
- No new third-party JavaScript without explicit justification.
- No telemetry that identifies users.

---

## Code of conduct

Be kind. Assume good faith. Disagree without dismissing. The agent context
trinity (`CLAUDE.md` / `SOUL.md` / `NORTH.md`) is collaborative, not
competitive — that applies to contributors here too.

---

## License

Contributions are licensed under MIT (`LICENSE`).
