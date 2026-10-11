---
title: "Lathe UI"
domain: "oss-library"
subtitle: "Zero-runtime headless components for AI-generated interfaces"
description: "A fictional open-source React library of headless, zero-runtime components. Its premise: interface code written with AI assistants should drop into an existing design system without a theme provider, a bundler plugin or a breaking migration."
whyItWorks: "The North Star bets on one specific shift, interface code written with AI assistants, and names a dated outcome for it. The Bar is measurable per component: bundle size, tree-shaking, no runtime CSS, axe in CI, a frozen stable API. The anti-goals refuse the three expansions a component library is most tempted by (a CLI scaffold, a theme provider, first-party tool integrations) and say why. The trade-offs that come up every sprint are settled in advance, each with the condition that reopens it, or an explicit never."
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

Not the most popular component library overall; that is a different race. This one: when a developer takes AI-generated interface code into a production codebase, Lathe primitives are the ones it already uses.

## 2. The Bar

A component is shippable when it meets all of the following:

- **Zero runtime CSS.** No injected `<style>` tags, no CSS-in-JS, no global stylesheet. Consumers own the styling surface entirely.
- **Clean tree-shaking.** Importing `Button` adds only `Button`'s code to the bundle. No side effects at the package root.
- **Copy-paste installable.** A developer can paste a single component file into their project and it works without installing Lathe at all. This is a constraint, not a convenience.
- **WCAG AA by default.** Keyboard navigation, focus management, ARIA roles and screen reader announcements are correct out of the box. Accessibility is not configurable; it is structural.
- **Typed, with no `any`.** Full TypeScript generics, discriminated unions for variant props, no escape hatches.
- **No breaking changes to stable components.** Once a component ships outside `experimental`, its prop contract does not change in a minor or patch release.

Bundle size and axe results are tracked per component in CI. A regression in either blocks the release.

## 3. Asymmetric Bets

**Go 10x on:**

- **Documentation over marketing.** The README, the docs site and inline JSDoc are the product. If a developer cannot understand a component in 30 seconds from its source file alone, rewrite it.
- **Copy-paste ergonomics.** Every component is readable and self-contained when extracted from the package. This shapes the architecture; it is not a nice-to-have.
- **Accessibility correctness.** WAI-ARIA patterns are complex and often implemented wrongly. Being the library that gets them right is the advantage that lasts.

**Accept 1.1x on:**

- **Visual defaults.** Lathe is headless. Unstyled components are plain on purpose; we do not invest in making the defaults beautiful.
- **Non-React adapters.** Vue, Svelte and Web Components ports are community contributions. We stay on React until the API is stable.
- **Landing page design.** The docs site is functional. A visual refresh is a two-way door and always waits.

## 4. Anti-Goals

- **We do not build a CLI scaffold.** A `create-lathe-app` command is tempting and would drive installs. It would also lock us into opinions about the rest of the stack that we cannot take back. Others can build the scaffold.
- **We do not ship a theme provider.** A central `ThemeProvider` with design tokens is what every consumer asks for first. It is also what makes component libraries brittle and hard to fit into an existing design system. The answer is no.
- **We do not ship first-party integrations with design or documentation tools.** They are tooling layers with their own release cycles. Community plugins are welcome; we do not own that surface.
- **We do not promote an `experimental` component to stable to meet a release date.** The `experimental` namespace exists to absorb that pressure. If a component is not ready, it stays there.

## 5. Trade-off Defaults

| Trade-off | Default | Flip when |
|---|---|---|
| Developer experience vs. bundle size | Bundle size | The ergonomic version costs zero runtime bytes (types-only or compile-time); then developer experience wins |
| Coverage vs. stability | Stability: no new stable component until the previous batch has run in real projects for two weeks without a breaking report | A missing primitive is pushing consumers into inaccessible workarounds; ship it as `experimental` straight away |
| Accessibility vs. ergonomics | Accessibility: the correct ARIA pattern ships even if it needs more props | Never on behaviour. If the correct pattern is verbose, improve the abstraction, not the standard |
| Build vs. buy (tooling) | Adopt established open-source tools for testing, docs and releases | A tool adds a cost that consumers pay (runtime bytes, a peer dependency or a build step); then replace it |
| Versioning strictness | Strict: breaking changes only in majors; uncertain APIs live under `experimental` | A security fix cannot be made without a breaking change; ship it as a patch with a prominent changelog entry and a codemod |

## 6. Ambition Triggers

- _"If a developer pastes this component file straight into their project, does it still make sense?"_
- _"Would the React core team ship this API surface?"_
- _"If this import adds more than 2 KB after tree-shaking, what is the architectural reason, and is it justified?"_
- _"Is this the component that ends up in every AI-generated dashboard for the next three years?"_
- _"Is this the implementation people will link to when they explain the ARIA pattern?"_

## 7. Reversibility

**One-way doors — decide deliberately:**

- Stable component prop names and types. Once shipped outside `experimental`, they hold until the next major version.
- The zero-runtime-CSS constraint. Reversing it would void the library's core promise.
- The copy-paste-install pattern. Any architectural decision that stops a component working standalone is a breaking change.
- The package name. Renaming is possible but costly for every consumer.

**Two-way doors — move fast:**

- Internal implementation details: hooks, utilities, how state is managed inside a component.
- Docs site structure and copy.
- CI tooling and test runner choices.
- `experimental` component APIs. That is exactly what the namespace is for.
- Changelog format and release cadence.

**When in doubt:** if a consumer can see it, treat it as one-way; otherwise treat it as two-way and move.
