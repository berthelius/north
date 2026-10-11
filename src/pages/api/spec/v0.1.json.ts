export const prerender = true;

// Mirrors SPEC.md. When SPEC.md changes, update this file in the same commit.
const spec = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://northfile.dev/api/spec/v0.1.json',
  title: 'NORTH.md v0.1',
  version: '0.1',
  status: 'active',
  publishedAt: '2026-10-11',
  authors: [
    {
      name: 'Viktor Berthelius',
      url: 'https://www.brthls.com',
    },
  ],
  license: 'MIT',
  homepage: 'https://northfile.dev',
  repository: 'https://github.com/berthelius/north',
  source: 'https://northfile.dev/spec.md',
  description:
    "NORTH.md is an open convention: one markdown file that declares a project's purpose, ambition and precomputed trade-offs for humans and AI coding agents. It is designed to give agents judgment when the prompt runs out.",
  abstract:
    'A proposed direction layer for agent context files. It sits alongside CONSTITUTION.md (limits), AGENTS.md / CLAUDE.md (how agents work), DESIGN.md (look and feel), and SOUL.md (who the agent is). The five-layer model is a proposal, not an established standard.',
  fileLocation:
    'MUST be placed at the repository root. In a monorepo with multiple distinct products, each product MAY have its own NORTH.md in its package root; the root file then describes the umbrella ambition.',
  fileFormat: 'CommonMark markdown.',
  conformance:
    'SHOULD contain the seven canonical sections, in order, each as an H2 heading. Sections MAY be omitted if not applicable, but the heading SHOULD be retained with a brief note explaining the omission. Additional sections MAY be added after the seven canonical ones.',
  sections: [
    {
      order: 1,
      name: 'North Star',
      slug: 'north-star',
      required: false,
      description:
        'A single sentence declaring the destination. Not the roadmap. Not the next quarter. The destination.',
      criteria: [
        'Specific enough to disqualify alternatives.',
        'Ambitious enough to be uncomfortable.',
        'Reachable in principle.',
      ],
      example:
        'Arkwell makes a one-day month-end close the norm for European small manufacturers by 2030.',
    },
    {
      order: 2,
      name: 'The Bar',
      slug: 'the-bar',
      required: false,
      description:
        'The quality threshold that distinguishes "shipped" from "started". Defines what work is acceptable to call done.',
      criteria: [
        'Measurable or observable.',
        'Higher than industry default.',
        'Defended by gates: items SHOULD map to enforcement (CI checks, linters, review rules, runbooks).',
      ],
      example:
        'Every shipped feature passes: typecheck, lint, full test suite, Lighthouse ≥95 on all metrics, WCAG AA via axe, and i18n parity across every supported locale. No exceptions, no "TODO: tests later".',
    },
    {
      order: 3,
      name: 'Asymmetric Bets',
      slug: 'asymmetric-bets',
      required: false,
      description:
        'The places where we deliberately invest 10x effort, and the places where 1.1x is correct.',
      criteria: [
        'Names where we go big: what deserves disproportionate investment because it is load-bearing or strategically decisive.',
        'Names where we deliberately ship medium: what is fine at 80% so capacity goes to the bets.',
      ],
      example: {
        goTenX: [
          'Stock-to-ledger reconciliation',
          'E-invoicing correctness',
          'Migration from the incumbent system',
        ],
        acceptOnePointOneX: ['Admin settings UI', 'Dashboard polish', 'Internal reports'],
      },
    },
    {
      order: 4,
      name: 'Anti-Goals',
      slug: 'anti-goals',
      required: false,
      description:
        'The things we explicitly refuse to do, even when they would be easy or profitable in the short term.',
      criteria: [
        'Tempting: if no one would ever ask for it, it is not an Anti-Goal.',
        'Justified: a one-line reason that survives pushback.',
        'Specific.',
      ],
      example: [
        "We do not build a CRM module. (Mature CRMs exist; we integrate, we don't rebuild.)",
        'We do not support on-prem deployment. (Distracts from cloud-first product velocity.)',
        'We do not accept feature requests with no documented user pain. (Roadmap is pull-based, not push-based.)',
      ],
    },
    {
      order: 5,
      name: 'Trade-off Defaults',
      slug: 'trade-off-defaults',
      required: false,
      description:
        'Decisions already made about common trade-offs, written down once so they are not re-debated each sprint. For each: name the default, and name the conditions under which the default flips.',
      commonPairs: [
        'Speed vs. safety',
        'Breadth vs. depth',
        'Build vs. buy',
        'Generality vs. fit',
        'Backward compatibility vs. clean design',
        'Single tenant vs. multi tenant',
      ],
      templateFormat: {
        format: 'markdown-table',
        columns: ['Trade-off', 'Default', 'Flip when'],
        normative: false,
      },
      example: [
        {
          tradeoff: 'Speed vs. safety',
          default: 'Speed on internal tooling; safety on fiscal code',
          flipWhen: 'Any code touching e-invoicing or payroll takes the safety default',
        },
      ],
    },
    {
      order: 6,
      name: 'Ambition Triggers',
      slug: 'ambition-triggers',
      required: false,
      description:
        'Phrases, used by humans and quoted in AI agent prompts, that escalate scope when the team is thinking too small.',
      criteria: [
        'Short enough to remember.',
        'Forces a specific reframe.',
        "Allowed to be answered with 'this is the 10x version'.",
      ],
      example: [
        'Is there a 10x version of this?',
        'What would [reference team] ship here?',
        'If we had three weeks instead of three days, what would change?',
        "What's the version of this that ends up in the keynote demo?",
      ],
    },
    {
      order: 7,
      name: 'Reversibility',
      slug: 'reversibility',
      required: false,
      description:
        'A map of which decisions are one-way doors (expensive to reverse) and which are two-way doors (cheap to reverse). One-way doors deserve deliberation. Two-way doors deserve speed.',
      criteria: [
        'Lists the one-way doors in this project.',
        'Lists the two-way doors in this project.',
        'States the default disposition when in doubt.',
      ],
      example: {
        oneWayDoors: ['E-invoice signature format', 'Public API response shape', 'Domain name choice'],
        twoWayDoors: [
          'Internal admin UI',
          'Dependency on a given OSS library',
          'Non-public code organisation',
        ],
        whenInDoubt: 'Treat as two-way and move.',
      },
    },
  ],
  proposedStack: {
    note: 'A model proposed by this specification, not an established standard. Most repositories will use only some of these files.',
    layers: [
      {
        layer: 1,
        file: 'CONSTITUTION.md',
        focus: 'Limits',
        answers: 'Which principles and boundaries are non-negotiable?',
      },
      {
        layer: 2,
        file: 'AGENTS.md / CLAUDE.md',
        focus: 'How agents work',
        answers: 'How do we build, test, and run?',
      },
      {
        layer: 3,
        file: 'DESIGN.md',
        focus: 'Look and feel',
        answers: 'Which design tokens, and why?',
      },
      {
        layer: 4,
        file: 'SOUL.md',
        focus: 'Agent persona',
        answers: 'Who is the agent: voice, values, tone?',
      },
      {
        layer: 5,
        file: 'NORTH.md',
        focus: 'Direction',
        answers:
          'Why does the project exist, how far do we push, and which trade-offs are already decided?',
      },
    ],
  },
  versioning: {
    policy: 'semver',
    declareInFile: '<!-- NORTH.md spec: v0.1 -->',
    major: 'Breaking section changes.',
    minor: 'Additive sections or clarifications that may change validator behaviour.',
    patch: 'Editorial changes.',
  },
};

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Spec-Version': '0.1',
    },
  });
}
