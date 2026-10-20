import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes every asset URL relative, so the build works under
// https://<user>.github.io/<any-repo-name>/ without editing this file.
// Routing uses HashRouter, so refreshes and deep links never hit the server.
export default defineConfig({
  base: './',
  plugins: [react()],
});
