import { defineConfig } from "vite";

export default defineConfig({
    root: ".",
    base: "./",
    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: "esbuild",
        sourcemap: true,
    },
});
