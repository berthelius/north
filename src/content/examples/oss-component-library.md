---
title: "Lathe UI"
domain: "oss-library"
subtitle: "Zero-runtime headless components for AI-generated interfaces"
description: "Lathe UI is an open-source React component library built on one premise: AI-generated interface code should drop into an existing design system without breaking it. Lathe provides copy-paste-installable, zero-runtime-CSS, fully tree-shakeable primitives that survive being dropped into any existing codebase without a bundler plugin, a theme provider, or a breaking migration."
whyItWorks: "This NORTH.md works because the North Star identifies a specific structural shift — AI-generated UI tooling — and names a concrete outcome (default headless library for that category) with a deadline. The bar is measurable: bundle size, tree-shaking, no runtime CSS, no breaking changes. The anti-goals confront the three most tempting directions for a component library (CLI tooling, a theme provider, a design app integration) and justify the refusals. The trade-off defaults are precomputed for the decisions that arise in every sprint: DX vs. bundle size, coverage vs. stability, accessibility vs. ergonomics."
kind: "illustrative"
order: 3
---

<!-- NORTH.md spec: v0.1 -->

# NORTH.md — Lathe UI

> Project purpose, ambition, and trade-off defaults.
> For contributing conventions, see `CONTRIBUTING.md`.
> For component API details, see `docs/`.

## 1. North Star

**Become the default headless component library for AI-generated React interfaces by the end of 2027.**

Not the most popular component library overall — that race is over. The specific race: when a developer takes AI-generated UI code and integrates it into a production codebase, Lathe primitives are the ones already there.

## 2. The Bar

A component is shippable when it meets all of the following:

- **Zero runtime CSS.** No injected `<style>` tags, no CSS-in-JS, no global stylesheet required. Consumers own the styling surface entirely.
- **Perfect tree-shaking.** Importing `Button` adds only `Button`'s code to the bundle. No side effects at the package root.
- **Copy-paste installable.** A developer can paste a single component file into their project and it works without installing Lathe at all. This is a constraint, not a convenience.
- **WCAG AA by default.** Keyboard navigation, focus management, ARIA roles, and screen reader announcements correct out of the box. Accessibility is not configurable — it is structural.
- **Typed with no `any`.** Full TypeScript generics, discriminated unions for variant props, no escape hatches.
- **No v1 surface breaks.** Once a component ships as stable (not `experimental`), its prop contract does not change in a minor or patch release.

Lighthouse and bundle size are tracked per-component in CI. Any component regression blocks the release.

## 3. Asymmetric Bets

**Go 10x on:**

- **Documentation over marketing.** The README, docs site, and inline JSDoc are the product. If a developer cannot understand the component in 30 seconds from the source file alone, rewrite.
- **Copy-paste ergonomics.** Every component is designed to be readable and self-contained when extracted from the package. This shapes architecture at a structural level — not a nice-to-have.
- **Accessibility correctness.** The WAI-ARIA patterns are complex and frequently misimplemented. Being the library that gets this right is the durable competitive advantage.

**Accept 1.1x on:**

- **Visual defaults.** Lathe is headless. Unstyled components are intentionally plain. We do not invest in making the defaults beautiful.
- **Non-React adapters.** Vue, Svelte, and Web Components ports are community contributions. We focus on React until the API is stable.
- **Landing page design.** The docs site is functional. A visual refresh is a two-way door and always deprioritised.

## 4. Anti-Goals

- **We do not build a CLI scaffold tool.** `npx create-lathe-app` is tempting and would drive installs. It would also lock us into opinions we cannot reverse. Let others build the scaffold.
- **We do not ship a theme provider.** A central `ThemeProvider` component with design tokens is what every consumer asks for. It is also what makes component libraries brittle, opinionated, and hard to co-locate with existing design systems. The answer is always no.
- **We do not integrate with Figma or Storybook as first-party features.** These are tooling layers. Community plugins are welcome; we do not own the integration surface.
- **We do not ship an `experimental` component into a `stable` minor release.** The `experimental` namespace exists precisely to avoid this pressure. If a component is not ready, it stays behind the flag.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| DX vs. bundle size | Bundle size wins — always | Never. The zero-runtime constraint is the North Star, not a preference |
| Coverage vs. stability | Stability — no new stable components until the previous batch has two weeks of real-world usage | Ecosystem emergency (a widely-used component has a critical a11y bug) |
| Accessibility vs. ergonomics | Accessibility wins — the correct ARIA pattern ships even if it requires more prop boilerplate | Never. If a11y requires verbosity, improve the abstraction, not the standard |
| Build vs. buy (tooling) | Buy (Vitest, Storybook community integration, Changesets) | A tool imposes a bundle-time cost on consumers — replace it |
| Semantic versioning strictness | Strict — breaking changes only in majors, `experimental` namespace for uncertain APIs | Emergency security patch — patch version with clear changelog entry |

## 6. Ambition Triggers

- *"If a developer pastes this component file directly into their project, does it make sense?"*
- *"Would the React core team ship this API surface?"*
- *"If tree-shaking analysis shows this import adds more than 2 KB, what is the architectural reason — and is it justified?"*
- *"Is this the component that ends up in every AI-generated dashboard for the next three years?"*
- *"What would the version of this look like that becomes the MDN reference implementation?"*

## 7. Reversibility

**One-way doors — decide deliberately:**

- Stable component prop names and types. Once shipped outside `experimental`, these are permanent until a major version.
- The zero-runtime-CSS constraint. Reversing this invalidates the library's core value proposition.
- The copy-paste-install pattern. Any architectural decision that breaks a component's ability to work standalone is a breaking change.
- The package name (`lathe-ui` on npm). Migration is possible but costly for all consumers.

**Two-way doors — move fast:**

- Internal implementation details — hooks, utilities, how state is managed inside a component.
- Docs site structure and copy.
- CI tooling and test runner choices.
- `experimental` component APIs — that is exactly what the namespace is for.
- Changelog format and release cadence.

**When in doubt:** treat as two-way and move.
