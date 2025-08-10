// The content configuration for the site

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// The collection of signs
const signs = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/pages/signs" }),
	schema: z.object({
		title: z.string().or(z.number()),
		image: z.string().optional(),
		category: z.string(),
		dependentImages: z.array(z.string()).optional(),
	}),
});

// The collection of resources
const resources = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/pages/resources" }),
	schema: z.object({
		title: z.string(),
	}),
});

// Export the collections
export const collections = { signs, resources };
