// Site-wide navigation and URL helpers.

export const AUTHOR = 'Eduardo Correia';
export const AUTHOR_URL = 'https://www.apliant.com.br/eduardo';
export const AUTHOR_GITHUB = 'https://github.com/99ecarvalho';
export const AUTHOR_LINKEDIN = 'https://www.linkedin.com/in/c99-eduardo';
export const CONTACT_EMAIL = 'eduardo@linscp.org';
export const SECURITY_EMAIL = 'security@linscp.org';
export const SPONSOR_URL = 'https://github.com/sponsors/99ecarvalho';

export interface NavItem {
	label: string;
	href: string;
	match?: string;
	external?: boolean;
}

export const nav: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Download', href: '/download/' },
	{ label: 'Manual', href: '/manual/', match: '/manual/' },
	{ label: 'News', href: '/news/', match: '/news/' },
	{ label: 'Support', href: '/support/' },
	{ label: 'Donate', href: '/donate/' },
	{ label: 'Security', href: '/security/' },
	{ label: 'Source code', href: 'https://github.com/99ecarvalho/linscp', external: true },
];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-absolute path with the deployment base. */
export const href = (path: string) => `${base}${path}`;

export function isActive(pathname: string, item: NavItem): boolean {
	if (item.external) return false;
	const rel = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
	return item.match ? rel.startsWith(item.match) : rel === item.href;
}
