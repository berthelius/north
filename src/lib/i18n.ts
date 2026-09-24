export type Language = 'en' | 'es';

export const SUPPORTED_LANGUAGES: Language[] = ['en', 'es'];
export const DEFAULT_LANGUAGE: Language = 'en';

export function getLanguageFromUrl(url: URL): Language {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang === 'es') {
    return 'es';
  }
  return 'en';
}

export function buildLocalizedPath(path: string, lang: Language): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Strip existing language prefix if present
  const stripped = cleanPath.replace(/^\/es(\/|$)/, '$1') || '/';

  if (lang === 'en') {
    return stripped;
  }
  return stripped === '/' ? '/es' : `/es${stripped}`;
}

export function getAlternateLinks(path: string, siteUrl: string = 'https://northfile.dev'): Array<{ lang: Language; href: string }> {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    lang,
    href: `${siteUrl}${buildLocalizedPath(path, lang)}`,
  }));
}
