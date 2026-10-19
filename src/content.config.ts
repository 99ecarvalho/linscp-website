import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const link = z.object({ label: z.string(), href: z.string() });

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Small mono label above the title; defaults to the sidebar group.
				eyebrow: z.string().optional(),
				// Hide the article header (home page).
				hideTitle: z.boolean().optional(),
				// Badge in the meta row under the title.
				badge: z.string().optional(),
				// Page is produced by scripts/gen-cli-reference.mjs.
				generated: z.boolean().optional(),
				// News posts.
				date: z.coerce.date().optional(),
				// "Further reading" and "Keep exploring" blocks under the article.
				sources: z.array(link).optional(),
				related: z.array(z.string()).optional(),
			}),
		}),
	}),
};
