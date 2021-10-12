import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSvgLoader from '../../index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSvgLoader()]
})
