import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// ── Per-site configuration ─────────────────────────────────────
// Change these two values for each new site you create from this
// template:
//
//   SITE_URL  — your GitHub Pages URL (e.g. https://starfish271.github.io)
//   BASE_PATH — the repo name, prefixed with / (e.g. /my-portfolio)
//               For a username.github.io repo, use /
//
// You can also set them via environment variables if preferred:
//   SITE_URL=https://username.github.io BASE_PATH=/repo-name npm run build
const SITE_URL = process.env.SITE_URL || 'https://starfish271.github.io';
const BASE_PATH = process.env.BASE_PATH || '/extx-site';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  integrations: [react()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
