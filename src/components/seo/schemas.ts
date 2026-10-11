/**
 * JSON-LD schema presets for northfile.dev.
 * Import and use with the JsonLd.astro component.
 *
 * Usage in an Astro page:
 *   import JsonLd from '../components/seo/JsonLd.astro';
 *   import { getDefinedTermSchema } from '../components/seo/schemas';
 *   ---
 *   <JsonLd data={getDefinedTermSchema()} />
 */

const SITE = 'https://northfile.dev';
const REPO = 'https://github.com/berthelius/north';

/** DefinedTerm — marks "NORTH.md" as a defined term for Google's knowledge graph. */
export function getDefinedTermSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${SITE}/#north-md`,
    name: 'NORTH.md',
    description:
      "NORTH.md is an open convention: one markdown file that declares a project's purpose, ambition and precomputed trade-offs for humans and AI coding agents.",
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Agent context files (proposed five-layer model)',
      url: SITE,
    },
    url: SITE,
    termCode: 'NORTH.md',
  };
}

/** SoftwareSourceCode — structured data for the GitHub repository. */
export function getSoftwareSourceCodeSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'NORTH.md',
    description:
      'Specification, landing page, and reference implementation for the NORTH.md convention.',
    url: SITE,
    codeRepository: REPO,
    programmingLanguage: 'Markdown',
    license: 'https://opensource.org/licenses/MIT',
    version: '0.1',
    datePublished: '2026-10-11',
    author: getPersonSchema(),
    maintainer: getPersonSchema(),
    keywords: [
      'NORTH.md',
      'AI agents',
      'CLAUDE.md',
      'AGENTS.md',
      'SOUL.md',
      'coding agents',
      'agent context files',
      'project convention',
    ],
  };
}

/** Organization — BRTHLS, the maintainer. */
export function getOrganizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.brthls.com/#organization',
    name: 'BRTHLS',
    url: 'https://www.brthls.com',
    founder: getPersonSchema(),
    sameAs: ['https://github.com/berthelius'],
  };
}

/** Person — Viktor Berthelius, the author. */
export function getPersonSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.brthls.com/about#person',
    name: 'Viktor Berthelius',
    url: 'https://www.brthls.com/about',
    sameAs: ['https://www.brthls.com', 'https://github.com/berthelius'],
  };
}

/** WebSite — for sitelinks searchbox and canonical site identity. */
export function getWebSiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    name: 'NORTH.md',
    url: SITE,
    description:
      'The landing page and specification for NORTH.md — the direction layer in a proposed five-layer model of agent context files.',
    author: getPersonSchema(),
    publisher: getOrganizationSchema(),
    license: 'https://opensource.org/licenses/MIT',
    inLanguage: 'en',
  };
}
