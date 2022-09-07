import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteSvgLoader from '../../'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  // define in .env:
  // VITE_SVG_DEFAULT_IMPORT=url
  // or as npm param:
  // npm --svg_default_import=url run build
  const DEFAULT_IMPORT = env.VITE_SVG_DEFAULT_IMPORT || env.npm_config_svg_default_import

  return {
    plugins: [
      vue(),
      viteSvgLoader({
        defaultImport: DEFAULT_IMPORT,
        svgoConfig: {
          plugins: [
            'preset-default',
            { name: 'prefixIds' } // For testing svgo path
          ]
        }
      })
    ],

    resolve: {
      alias: {
        // dynamically change App component based on the default import
        'App.vue': DEFAULT_IMPORT === 'url' ? './App-url.vue' : './App.vue'
      }
    }

  }
})
