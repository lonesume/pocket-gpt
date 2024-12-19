import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["#minpath", "#minproc", "#minurl"],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    hmr: {
      overlay: true,
    },
  },
});
