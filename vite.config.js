import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { buildLinks } from "./build-links.js";

export default defineConfig({
    root: ".",
    base: "./",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "esbuild",
        sourcemap: true,
        assetsInlineLimit: 10240,
    },
    plugins: [
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                minifyCSS: true,
                minifyJS: true,
            },
            inject: {
                data: {
                    linksSection: buildLinks(),
                },
            },
        }),
    ],
});
