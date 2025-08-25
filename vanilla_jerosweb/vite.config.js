import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root:resolve(__dirname, './'),
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      main: resolve(__dirname, './index.html'),
    }
  }
});