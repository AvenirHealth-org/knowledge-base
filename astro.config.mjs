// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid'

import cloudflare from '@astrojs/cloudflare';

// One sidebar group per folder in src/content/docs/projects, so a new project
// only needs a new folder.
const projectGroups = readdirSync('./src/content/docs/projects', { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => ({
        label: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
        items: [{ autogenerate: { directory: `projects/${entry.name}` } }],
    }));

// https://astro.build/config
export default defineConfig({
  site: 'https://avenirhealth-org.github.io',

  integrations: [
      starlight({
          title: 'Avenir Health Knowledge Base',
          customCss: ['./src/styles/custom.css'],
          head: [{ tag: 'script', attrs: { src: '/expand-diagrams.js', defer: true } }],
          logo: {
              src: './src/assets/AvenirHealth.png',
              replacesTitle: true,
          },
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
          sidebar: [
              {
                  label: 'General',
                  items: [{ autogenerate: { directory: 'general' } }],
              },
              {
                  label: 'Projects',
                  items: [{ label: 'All projects', link: '/projects/' }, ...projectGroups],
              },
          ],
      }),
      mermaid({
          theme: 'base',
          autoTheme: true
      })
	],

  adapter: cloudflare(),

  vite: {
    plugins: [
      {
        // The worker build resolves satteri's `browser` entry, which imports its
        // wasm binding. That package is cpu-restricted so npm never installs it
        // on x64. Nothing in the worker uses satteri at runtime (markdown is
        // compiled at build time), so leave the import external.
        name: 'externalize-satteri-wasm',
        enforce: 'pre',
        resolveId(id) {
          if (id === '@bruits/satteri-wasm32-wasi') return { id, external: true };
        },
      },
    ],
  },
});
