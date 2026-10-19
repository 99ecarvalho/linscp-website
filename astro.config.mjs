// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar.mjs';

// Served at https://linscp.org/ (GitHub Pages custom domain).
// SITE_URL / BASE_PATH override it, e.g. BASE_PATH=/linscp-website for the github.io address.
const site = process.env.SITE_URL ?? 'https://linscp.org';
const base = process.env.BASE_PATH ?? '/';
// Base without a trailing slash, for building asset paths: '' at the root.
const prefix = base.replace(/\/$/, '');

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'linscp',
			description: 'linscp: a free SFTP, SCP, FTP, WebDAV and S3 client for Linux and Windows.',
			logo: { src: './src/assets/linscp.svg', alt: '' },
			favicon: '/favicon.svg',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: `${prefix}/favicon.ico`, sizes: '16x16 24x24 32x32 48x48 256x256' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: `${prefix}/favicon-32.png`, sizes: '32x32' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${prefix}/apple-touch-icon.png`, sizes: '180x180' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: `${prefix}/site.webmanifest` } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#1f2329' } },
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/99ecarvalho/linscp' },
			],
			lastUpdated: true,
			customCss: ['./src/styles/theme.css'],
			components: {
				Header: './src/components/Header.astro',
				PageTitle: './src/components/PageTitle.astro',
				Footer: './src/components/Footer.astro',
			},
			sidebar,
		}),
	],
});
