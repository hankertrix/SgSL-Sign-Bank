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

					// For the pagefind script to work
					"'unsafe-hashes'",
				],

				hashes: [
					//

					// The script to use pagefind to search
					"sha256-wBJKTIkZ4WIHjpTxU0/X3CYroZ1i2DW3UaEcwGIo2Ps=",

					// The pagefind.js script that is being imported
					// in the script that uses pagefind to search
					"sha256-qlng61eSdcgx1YP9CGiERbV74MqCPHo1ZSCPfx4FJoo=",

					// The script to load the pagefind highlighter
					"sha256-Ulpb4Pzb595Vi5aqryffW4xfSPkooLYyM2Ebq5ER9Nk=",
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
