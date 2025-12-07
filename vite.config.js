// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 🌱 Base simple: ATLASH vive en la raíz de su propio servidor
  base: "/",

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  preview: {
    port: 4173,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
