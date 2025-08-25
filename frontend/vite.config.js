// This is Vite's project configuration file, where you're telling it how to behave.
/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //"Whenever you see an import starting with @/, treat that as if it’s coming from the src/ folder."
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

//__dirname is the current directory where the config file lives
// path.resolve(...) converts "./src" to an absolute path
