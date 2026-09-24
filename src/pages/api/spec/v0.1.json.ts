export const prerender = true;

const spec = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://northfile.dev/api/spec/v0.1.json',
  title: 'NORTH.md v0.1',
  version: '0.1',
  status: 'active',
  publishedAt: '2026-09-24',
  authors: [
    {
      name: 'Viktor Berthelius',
      url: 'https://brthls.com',
    },
  ],
  license: 'MIT',
  homepage: 'https://northfile.dev',
  repository: 'https://github.com/berthelius/north',
  description:
    'NORTH.md declares a software project\'s purpose, ambition, and precomputed trade-off defaults in a form readable by both humans and AI coding agents. It gives agents judgment when the prompt runs out: scaling agency without scaling drift.',
  abstract:
    'The decision arbitration layer in the modern agent stack. Complements CONSTITUTION.md (limits), AGENTS.md / CLAUDE.md (execution), design.md (visual system), and SOUL.md (identity). NORTH.md governs decision arbitration, quality bar enforcement, and ambition when competing valid paths exist.',
  fileLocation: 'Repository root (NORTH.md). Monorepo packages may each have their own package-level NORTH.md.',
  fileFormat: 'CommonMark markdown with seven canonical H2 sections.',
  sections: [
    {
      order: 1,
      name: 'North Star',
      slug: 'north-star',
      required: true,
      description:
        'A single sentence declaring the destination. Not the roadmap. Not the next quarter. The destination.',
      criteria: [
        'Specific enough to disqualify alternatives.',
        'Ambitious enough to be uncomfortable.',
        'Reachable in principle.',
      ],
      example:
        'Nordic ERP replaces traditional ERP software for European SMBs by making AI-native business management the default by 2027.',
    },
    {
      order: 2,
      name: 'The Bar',
      slug: 'the-bar',
      required: true,
      description:
        'The non-negotiable threshold separating shipped from started. Combines mechanical automated gates with truth assertions.',
      criteria: [
        'Distinguishes mechanical automated gates (typecheck, lint, test coverage, WCAG AA) from truth assertions (zero speculative abstractions).',
        'Observable, auditable, and automated wherever possible.',
        'Non-negotiable — applies equally to humans and agents.',
      ],
      example:
        'Every shipped feature passes: typecheck, lint, full test suite, Lighthouse 95, WCAG AA, and complete programmatic surface coverage (UI, REST API, MCP tool, SDK).',
    },
    {
      order: 3,
      name: 'Current Ambition',
      slug: 'current-ambition',
      required: true,
      description:
        'The active horizon where the project chooses to over-invest. Changes across releases.',
      criteria: [
        'Names 2-4 areas receiving disproportionate engineering investment.',
        'Names what is intentionally deferred.',
        'Updated as horizons are reached or abandoned.',
      ],
      example:
        'We over-invest in: sub-second cold starts, zero-runtime static pre-rendering, and exhaustive MCP schema documentation.',
    },
    {
      order: 4,
      name: 'Anti-Goals',
      slug: 'anti-goals',
      required: true,
      description:
        'Explicit, written-down refusals of things that would be tempting or profitable but are out of scope.',
      criteria: [
        'Refuses things that someone would genuinely ask for.',
        'Carries a one-line justification that survives pushback.',
        'Updated when the team repeatedly says no to the same request.',
      ],
      example:
        'We do not build custom CRM modules — Twenty exists, integrate rather than rebuild.',
    },
    {
      order: 5,
      name: 'Trade-off Defaults',
      slug: 'trade-off-defaults',
      required: true,
      description:
        'Structured precomputed decisions with explicit flip conditions. Enables autonomous execution without human blocker.',
      schema: {
        format: 'markdown-table',
        columns: ['Trade-off', 'Default', 'Flip when'],
      },
      criteria: [
        'Declares the pair of competing valid values.',
        'Names the default unequivocally.',
        'Defines the measurable condition under which the default inverts.',
      ],
      example: [
        {
          tradeoff: 'Build vs. buy',
          default: 'Buy standard infra (Postgres, Stripe, Sentry)',
          flipWhen: 'Vendor pricing breaks unit economics at scale',
        },
      ],
    },
    {
      order: 6,
      name: 'Ambition Triggers',
      slug: 'ambition-triggers',
      required: true,
      description:
        'Provocative self-audit questions an agent evaluates before concluding a task to combat conservative regression to the mean.',
      criteria: [
        'Questions that disqualify mediocre implementations.',
        'Challenges the agent to consider the broader system impact.',
        'Invites uncomfortable, high-calibre refactoring.',
      ],
      example: [
        'Does this change give agents judgment when the prompt runs out, or just more instructions?',
        'Would Linear, Stripe, or Vercel ship this surface?',
        'If we had three more days, what changes — and why aren\'t we doing that now?',
      ],
    },
    {
      order: 7,
      name: 'Reversibility',
      slug: 'reversibility',
      required: true,
      description:
        'Classification of decisions into one-way doors (stopping for human review) vs. two-way doors (executing autonomously).',
      criteria: [
        'One-way doors: public API signatures, storage migrations, security boundaries.',
        'Two-way doors: internal refactors, styling details, non-breaking helper utilities.',
      ],
      example: {
        oneWayDoors: [
          'Public API breaking schema changes.',
          'Database schema drops or irreversible migrations.',
        ],
        twoWayDoors: [
          'Internal component refactoring.',
          'Copy polish on existing landing pages.',
        ],
      },
    },
  ],
  governanceStack: [
    {
      layer: 1,
      file: 'CONSTITUTION.md',
      focus: 'Limits & Safety',
      answers: 'What is forbidden?',
    },
    {
      layer: 2,
      file: 'AGENTS.md / CLAUDE.md',
      focus: 'Operations & Execution',
      answers: 'How to build, test, and run?',
    },
    {
      layer: 3,
      file: 'design.md',
      focus: 'Visual & Design System',
      answers: 'What tokens, layouts, and components to construct?',
    },
    {
      layer: 4,
      file: 'SOUL.md',
      focus: 'Voice & Persona',
      answers: 'Who is the product toward the end user?',
    },
    {
      layer: 5,
      file: 'NORTH.md',
      focus: 'Purpose & Arbitration',
      answers: 'Why does it exist, how far to go, and which trade-offs to pick?',
    },
  ],
  versioning: {
    policy: 'semver',
    declareInFile: '<!-- NORTH.md spec: v0.1 -->',
    breakingChangeDefinition:
      'Renaming, removing, or changing the required status of any of the seven canonical sections.',
  },
};

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'X-Spec-Version': '0.1',
    },
  });
}
