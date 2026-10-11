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
- **Motion**: `motion.dev` (Framer Motion v12) + native View Transitions API
- **Docs sub-route**: Astro Starlight (if added)
- **OG dynamic**: `@vercel/og`
- **Search**: Pagefind (if added)
- **Analytics**: Umami self-hosted (no cookies, no GDPR pop-up)
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
npm run lint        # Astro check gate
```

## File ownership for sub-agents

When dispatching parallel sub-agents (isolated worktree megasprint pattern),
strict file ownership to avoid cascade conflicts:

| Stream | Owns paths |
|---|---|
| Design system | `src/styles/*`, `src/components/ui/*`, `tailwind.config.*` |
| Landing pages | `src/pages/*` (excluding `/api/*`, `/docs/*`) |
| Interactive | `src/components/interactive/*`, `src/scripts/*` |
| Examples | `src/content/examples/*` |
| SEO + AIO | `src/pages/api/*`, `public/llms*.txt`, `public/robots.txt`, `astro.config.mjs` (sitemap) |
| Docs | `src/content/docs/*`, `src/pages/docs/*` |

Cascade order on merge: design system → SEO+AIO → landing → interactive →
examples → docs.

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
