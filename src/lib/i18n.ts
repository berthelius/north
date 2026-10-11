export type Language = 'en' | 'es';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es'];
export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Single source of truth: EN route paths that also exist under /es.
 * Add a route here in the same change that adds src/pages/es/<route>.
 * scripts/check-links.mjs fails the build if a link points at a missing page.
 */
export const LOCALIZED_ROUTES: readonly string[] = ['/', '/spec', '/compare'];

export function getLanguageFromUrl(url: URL): Language {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang === 'es') {
    return 'es';
  }
  return 'en';
}

/** Canonical path form: leading slash, no trailing slash (except root). */
export function normalizePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  const trimmed = withSlash.replace(/\/+$/, '');
  return trimmed || '/';
}

/** Split `/spec#seven` into the route part and the `#...`/`?...` suffix. */
function splitSuffix(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

/** Strip a leading /es prefix and normalise: `/es/spec/` -> `/spec`. */
export function stripLanguage(path: string): string {
  const cleanPath = normalizePath(path);
  return normalizePath(cleanPath.replace(/^\/es(\/|$)/, '/'));
}

/** True when a page exists for this EN route in the given language. */
export function hasLocalizedPage(path: string, lang: Language): boolean {
  if (lang === DEFAULT_LANGUAGE) return true;
  return LOCALIZED_ROUTES.includes(stripLanguage(splitSuffix(path)[0]));
}

function prefixed(stripped: string, lang: Language): string {
  if (lang === 'en') return stripped;
  return stripped === '/' ? '/es' : `/es${stripped}`;
}

/**
 * Link target for `path` in `lang`. Falls back to the EN route when no
 * localised page exists, so a link can never point at a missing page.
 */
export function buildLocalizedPath(path: string, lang: Language): string {
  const [route, suffix] = splitSuffix(path);
  const stripped = stripLanguage(route);
  const target = hasLocalizedPage(stripped, lang) ? lang : DEFAULT_LANGUAGE;
  return prefixed(stripped, target) + suffix;
}

/** Counterpart of the current page in `lang`, or null if none exists. */
export function getCounterpartPath(path: string, lang: Language): string | null {
  const stripped = stripLanguage(splitSuffix(path)[0]);
  return hasLocalizedPage(stripped, lang) ? prefixed(stripped, lang) : null;
}

/**
 * hreflang alternates: only for pages that exist in every language.
 * Empty array (no hreflang, no x-default) for EN-only pages.
 */
export function getAlternateLinks(path: string, siteUrl: string = 'https://northfile.dev'): Array<{ lang: Language | 'x-default'; href: string }> {
  const stripped = stripLanguage(path);
  if (!SUPPORTED_LANGUAGES.every((l) => hasLocalizedPage(stripped, l))) return [];
  const links: Array<{ lang: Language | 'x-default'; href: string }> = SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
    href: new URL(prefixed(stripped, lang), siteUrl).href,
  }));
  links.push({ lang: 'x-default', href: new URL(stripped, siteUrl).href });
  return links;
}
