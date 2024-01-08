// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cart_page: resolve(__dirname, 'pages/cart_page/index.html'),
        catalog_page: resolve(__dirname, 'pages/catalog_page/index.html'),
        category_page: resolve(__dirname, 'pages/category_page/index.html'),
        good_page: resolve(__dirname, 'pages/good_page/index.html'),
        loved_page: resolve(__dirname, 'pages/loved_page/index.html'),
        profile_page: resolve(__dirname, 'pages/profile_page/index.html')
      },
    },
  },
})