const { extname } = require('path')
const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')

module.exports = function svgLoader () {
  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      const path = id.split('?')[0]

      if (!extname(path).startsWith('.svg')) {
        return null
      }

      const svg = await fs.readFile(path, 'utf-8')

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        transformAssetUrls: false
      })

      return `${code}\nexport default render`
    }
  }
}
