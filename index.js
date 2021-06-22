const { extname } = require('path')
const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo } = options

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      const [path, parameter] = id.split('?')

      if (!extname(path).startsWith('.svg') || parameter === 'url') {
        return null
      }

      const svg = await fs.readFile(path, 'utf-8')

      const optimizedSvg = svgo === false ? svg : optimizeSvg(svg, svgoConfig).data

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: optimizedSvg,
        transformAssetUrls: false
      })

      return `${code}\nexport default render`
    }
  }
}
