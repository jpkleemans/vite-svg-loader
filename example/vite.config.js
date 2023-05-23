import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import svgLoader from '../'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({
    svgoConfig: {
      plugins: [
        'preset-default',
        { name: 'prefixIds' } // For testing svgo path
      ]
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  preview: {
    port: 5000
  }
})
