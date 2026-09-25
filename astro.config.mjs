import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages deployment — repo name goes in `base`.
// For a repo named "my-portfolio", set base: "/my-portfolio".
// When deploying to a custom domain or username.github.io repo, set base: "/".
export default defineConfig({
  site: 'https://starfish271.github.io',
  base: '/iiswebsite',
  output: 'static',
  integrations: [react()],
  markdown: {
    // Shiki syntax highlighting for code fences in Markdown
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
