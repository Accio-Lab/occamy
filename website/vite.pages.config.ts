import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "github-pages",
  base: process.env.GITHUB_PAGES === "true" ? "/occamy/" : "/",
  publicDir: "../public",
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  build: {
    outDir: "../pages-dist",
    emptyOutDir: true,
  },
});
