// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.PUBLIC_SITE_URL ?? 'https://northfile.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  // Canonical URL form site-wide: no trailing slash (matches vercel.json).
  trailingSlash: 'never',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: true,
  }),
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  vite: {
    // @ts-expect-error Tailwind Vite plugin type mismatch with Astro's bundled Vite
    plugins: [tailwindcss()],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    // Inline every stylesheet: no render-blocking CSS request before first paint.
    inlineStylesheets: 'always',
  },
  experimental: {
    contentIntellisense: true,
  },
});
