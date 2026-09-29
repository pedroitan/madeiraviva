import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ateliemadeiraviva.com',
  output: 'static',
  integrations: [sitemap()],
  image: {
    remotePatterns: [],
  },
});
