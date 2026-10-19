// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './src/sidebar.mjs';

// GitHub Pages project site by default; set SITE_URL / BASE_PATH for a custom domain.
const site = process.env.SITE_URL ?? 'https://99ecarvalho.github.io';
const base = process.env.BASE_PATH ?? '/linscp-website';

export default defineConfig({
	site,
	base,
	trailingSlash: 'always',
	integrations: [
		starlight({
			title: 'linscp',
			description: 'Free SFTP, SCP, FTP, WebDAV and S3 client for Linux and Windows.',
			logo: { src: './src/assets/linscp.svg', alt: '' },
			favicon: '/favicon.svg',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', href: `${base}/favicon.ico`, sizes: '16x16 24x24 32x32 48x48 256x256' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: `${base}/favicon-32.png`, sizes: '32x32' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: `${base}/apple-touch-icon.png`, sizes: '180x180' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: `${base}/site.webmanifest` } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#1f2329' } },
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/99ecarvalho/linscp' },
			],
			editLink: {
				baseUrl: 'https://github.com/99ecarvalho/linscp-website/edit/main/',
			},
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
