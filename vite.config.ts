import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Automatinis kintamųjų importas
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Alias `@` nukreipia į `src` katalogą
    },
  },
});
