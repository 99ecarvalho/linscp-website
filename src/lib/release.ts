// Newest linscp release, read from the GitHub API once per build.
// Every release so far is a pre-release, so /releases/latest (which skips them) is not used.
import fallback from '../data/release-fallback.json';

export const REPO = '99ecarvalho/linscp';
export const RELEASES_URL = `https://github.com/${REPO}/releases`;

export interface Asset {
	name: string;
	size: number;
	url: string;
	sha256: string | null;
}

export interface Release {
	tag: string;
	version: string;
	date: string;
	url: string;
	prerelease: boolean;
	assets: Asset[];
}

export interface Package {
	os: 'linux' | 'windows';
	kind: string;
	label: string;
	note: string;
	install?: string;
	asset: Asset;
}

let cached: Promise<Release> | undefined;

async function fetchRelease(): Promise<Release> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	try {
		const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`, { headers });
		if (!res.ok) throw new Error(`GitHub API ${res.status}`);
		const list = (await res.json()) as any[];
		const r = list.find((x) => !x.draft);
		if (!r) throw new Error('no published release');
		return {
			tag: r.tag_name,
			version: String(r.tag_name).replace(/^v/, ''),
			date: r.published_at,
			url: r.html_url,
			prerelease: r.prerelease,
			assets: r.assets.map((a: any) => ({
				name: a.name,
				size: a.size,
				url: a.browser_download_url,
				sha256: a.digest?.startsWith('sha256:') ? a.digest.slice(7) : null,
			})),
		};
	} catch (err) {
		console.warn(`[release] using fallback data: ${(err as Error).message}`);
		return fallback as Release;
	}
}

export function getRelease(): Promise<Release> {
	return (cached ??= fetchRelease());
}

// Known package kinds, matched on file name. Unknown assets are listed under "Other files".
const KINDS: { re: RegExp; os: Package['os']; kind: string; label: string; note: string; install?: (f: string) => string }[] = [
	{ re: /\.AppImage$/, os: 'linux', kind: 'appimage', label: 'AppImage', note: 'Any x86-64 distribution with glibc 2.41 or newer. No install needed.', install: (f) => `chmod +x ${f}\n./${f}` },
	{ re: /\.deb$/, os: 'linux', kind: 'deb', label: 'Debian package', note: 'Debian 13 and distributions with the same Qt 6.8 packages.', install: (f) => `sudo apt install ./${f}` },
	{ re: /\.flatpak$/, os: 'linux', kind: 'flatpak', label: 'Flatpak bundle', note: 'Any distribution with Flatpak. Pulls the KDE runtime from Flathub.', install: (f) => `flatpak install --user ${f}` },
	{ re: /-setup\.exe$/, os: 'windows', kind: 'setup', label: 'Installer', note: 'Windows 10 and 11, x64. Per-user or all-users install.' },
	{ re: /-portable\.zip$/, os: 'windows', kind: 'portable', label: 'Portable', note: 'Windows 10 and 11, x64. Unzip and run; settings stay beside the program.' },
];

export function packages(r: Release): { known: Package[]; other: Asset[] } {
	const known: Package[] = [];
	const other: Asset[] = [];
	for (const a of r.assets) {
		const k = KINDS.find((k) => k.re.test(a.name));
		if (k) known.push({ os: k.os, kind: k.kind, label: k.label, note: k.note, install: k.install?.(a.name), asset: a });
		else other.push(a);
	}
	known.sort((x, y) => KINDS.findIndex((k) => k.kind === x.kind) - KINDS.findIndex((k) => k.kind === y.kind));
	return { known, other };
}

export const formatSize = (n: number) =>
	n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`;

export const formatDate = (iso: string) =>
	new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
