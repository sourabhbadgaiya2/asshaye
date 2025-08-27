import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // sitemap.xml ko backend ki taraf forward karo
      "/sitemap.xml": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path, // path ko same hi rakho
      },
    },
  },
});
