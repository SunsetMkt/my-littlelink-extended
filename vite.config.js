import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { imagetools } from "vite-imagetools";

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
        imagetools(),
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                minifyCSS: true,
                minifyJS: true,
            },
        }),
    ],
});
