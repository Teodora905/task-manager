import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/tasks': {
        target: 'http://localhost:3000', // Target json-server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tasks/, '/tasks'),
      },
    },
  },
})
