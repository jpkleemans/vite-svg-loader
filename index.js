const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo } = options

  const svgRegex = /\.svg(\?(raw|url|component))?$/
  return {
    name: 'svg-loader',
    enforce: 'pre',
    resolveid (id) {
      return id.match(svgRegex) ? id : null
    },
    async load (id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      if (query === 'url') {
        return path
      } else if (query === 'raw') {
        return await fs.readFile(path, 'utf-8')
      }
    },
    async transform (src, id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      if (query === 'component' || query === undefined) {
        const svg = await fs.readFile(path, 'utf-8')

        const optimizedSvg = svgo === false ? svg : optimizeSvg(svg, svgoConfig).data

        let { code } = compileTemplate({
          id: JSON.stringify(id),
          source: optimizedSvg,
          filename: path,
          transformAssetUrls: false
        })

        code = code.replace('export function render', 'export default function render')

        return code
      }

      return `export default ${JSON.stringify(src)}`
    }
  }
}
module.exports.default = module.exports
