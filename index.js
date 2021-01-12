import { promises as fs } from 'fs'
import { compileTemplate } from '@vue/compiler-sfc'

export default function () {
  return {
    name: 'vue-svg-loader',
    enforce: 'pre',

    async load (id) {
      if (id.endsWith('.svg')) {
        const svg = await fs.readFile(id, 'utf-8')

        const { code } = compileTemplate({
          id: JSON.stringify(id),
          source: svg,
          transformAssetUrls: false
        })

        return `${code}\nexport default render`
      }

      return null
    }
  }
}
