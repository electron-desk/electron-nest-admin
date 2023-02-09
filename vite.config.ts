import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electronPlugin from './plugin/main';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), electronPlugin()],
  base: './',
  server: {
    proxy: {
      '^/admin': {
        target: 'http://localhost:3008',
      },
    },
  },
  build: {
    outDir: './dist/view',
  },
});
