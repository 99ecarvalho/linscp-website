// Manual sidebar. Each group maps to a folder under src/content/docs/manual/.
// Page order inside a group comes from each page's `sidebar.order` frontmatter.
const group = (label, dir, collapsed = false) => ({
	label,
	collapsed,
	items: [{ autogenerate: { directory: `manual/${dir}` } }],
});

export const sidebar = [
	{ label: 'Manual overview', link: '/manual/' },
	group('Start here', 'getting-started'),
	group('Connecting', 'connecting'),
	group('Working with files', 'files'),
	group('Transfers', 'transfers'),
	group('Synchronization', 'sync'),
	group('Editing', 'editing'),
	group('Preferences', 'preferences', true),
	group('Automation & scripting', 'scripting'),
	group('Command reference', 'reference', true),
	group('Security', 'security'),
	group('Integration', 'integration', true),
	group('Guides', 'guides', true),
	group('Troubleshooting', 'troubleshooting'),
	group('FAQ', 'faq'),
	group('About', 'about', true),
	group('Developers', 'developers', true),
];
