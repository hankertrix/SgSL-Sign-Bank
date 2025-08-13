// @ts-check
import { defineConfig } from "astro/config";
import { pagefind } from "vite-plugin-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://sgsl-sign-bank.vercel.app",
	output: "static",
	image: {
		layout: "constrained",
	},

	// Disable smartypants so the quotes don't look weird
	// due to the Chinese font
	markdown: {
		smartypants: false,
	},

	// CSP
	experimental: {
		csp: {
			algorithm: "SHA-512",
			directives: [
				"default-src 'none'",
				"img-src 'self'",
				"font-src 'self'",
				"connect-src 'self'",
				"manifest-src 'self'",
				"object-src 'none'",
				"frame-ancestors 'none'",
				"form-action 'none'",
				"base-uri 'none'",
			],
			scriptDirective: {
				resources: [
					"'self'",

					// For pagefind to work
					"'wasm-unsafe-eval'",
				],

				hashes: [
					//

					// The script to load the pagefind scripts
					"sha256-8VhgM9+2ocjs2dJMYwR5Iv15mGr1McUL/4b0Z944i4s=",
				],
			},
			styleDirective: {
				resources: [
					"'self'",

					// Needed for the hashes below to work
					"'unsafe-hashes'",
				],
				hashes: [
					//

					// The pagefind highlight style
					"sha256-ZCoB1kba9ZTfELA9P5NVsXbrXfcqOSTrLTbcMfUVY4E=",

					// Not sure what this style is for, but it's required
					"sha256-y0FDWhr0m3Jam1HNNCTVey61m4zSmlv57Q1pjAE7A+E=",
				],
			},
		},
	},

	vite: {
		plugins: [
			pagefind({
				outputDirectory: "dist",
				assetsDirectory: "public",
				bundleDirectory: "pagefind",
				buildScript: "build",
				developStrategy: "lazy",
			}),
		],
	},
});
