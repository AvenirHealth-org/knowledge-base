// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
	base: '/knowledge-base',
	integrations: [
		starlight({
			title: 'Avenir Health Knowledge Base',
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
	],
});
