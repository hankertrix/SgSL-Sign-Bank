// @ts-check
import { defineConfig } from "astro/config";
import { pagefind } from "vite-plugin-pagefind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

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

                    // The script to use pagefind to search
                    "sha256-CRG3rbY7+cge/Gw0MXgl2Es33TGGaQsD1J5PldO8Sww=",

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

    // Vite pagefind plugin
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

    // Generate a sitemap
    integrations: [sitemap(), mdx()],
});
