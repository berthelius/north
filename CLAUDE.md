# CLAUDE.md — berthelius/north

> Project rules for Claude Code sessions in this repository.
> See [NORTH.md](./NORTH.md) for project purpose and ambition (this is where
> "how far" is decided; this file is for "how").

## STATUS — PUBLIC v0.1 (2026-10-11)

Public release of NORTH.md — an open convention for purpose, ambition, and precomputed trade-offs. It proposes (does not claim as an established standard) a five-layer model of agent context files.

## Project

`northfile.dev` — landing, spec, and reference implementation for the **NORTH.md** convention.

## Stack

- **Astro 5.18** static-first + Vercel adapter
- **Tailwind 4** with `@theme` design tokens
- **Typography**: Anton (display) + JetBrains Mono (code) + Inter Variable (body)
- **Motion**: CSS transitions and keyframes, plus one small inline spring script (the hero compass); no motion library is imported
- **OG images**: `@vercel/og` (satori + resvg), prerendered to static PNGs at build time
- **Analytics**: none (if ever added: Umami self-hosted, no cookies)
- **Deploy**: Vercel

## Quality bar

Mirror the project Bar declared in [NORTH.md](./NORTH.md):

- Lighthouse 100/100/100/100 on every public page.
- WCAG AA via `axe-core`, zero violations.
- Custom design system, no template "AI landing" feel.
- Editorial typography only — never decorative or generic.
- LLM citability verified within seven days of launch.

## Conventions

- **No emojis in source files** unless the user explicitly asks. (Repo-wide.)
- **No analytics that identify users.** Umami self-hosted only.
- **No "powered by" footer** other than the optional NORTH.md badge itself.
- **No template starters** (Astroship, Astrowind, etc). Custom design system
  built from `@theme` tokens.
- **British English** in spec body, editorial copy. American English acceptable
  in code comments.
- **Spec wording is load-bearing.** Edits to the seven section names or
  signatures require an RFC and version bump.

## Gates (run before every push)

```bash
npm run build       # Astro static build
npm run typecheck   # Astro check (0 errors, 0 warnings, 0 hints)
npm run lint        # oxlint
npm run check:links # internal links and anchors across dist/
npm run check:seo   # canonical, lang, hreflang, og:image, JSON-LD, sitemap, robots
npm run check:spec  # JSON spec and spec.md agree on the seven sections
```

CI (`.github/workflows/ci.yml`) runs the same gates on pushes to main and on pull requests.

## What this project is NOT

- Not a SaaS product. No accounts, no billing, no API keys for end users.
- Not a paid tier. Specification is free; tooling, if any, lives elsewhere.
- Not a competitor to AGENTS.md, SOUL.md, or llms.txt. Generous cross-links;
  the five-layer model is a proposal.

## Related references

- [NORTH.md](./NORTH.md) — the project's own purpose declaration.
- [SPEC.md](./SPEC.md) — the specification text.
- [README.md](./README.md) — public-facing repo intro.
- Spec landing: `https://northfile.dev`
- Author site: `https://brthls.com`
