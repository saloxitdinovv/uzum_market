// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cart_page: resolve(__dirname, 'pages/cart_page/index.html'),
      },
    },
  },
})