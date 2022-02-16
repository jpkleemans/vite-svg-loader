const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo, defaultImport } = options

  const svgRegex = defaultImport === 'url'
    ? /\.svg\?(raw|component)$/ // only process if resource has ?raw or ?component query param
    : /\.svg(\?(raw|component))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    resolveid (id) {
      if (id.match(svgRegex)) {
        return id
      }
    },

    async load (id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      let svg = await fs.readFile(path, 'utf-8')

      if (query === 'raw' || (query == null && defaultImport === 'raw')) {
        return `export default ${JSON.stringify(svg)}`
      }

      if (svgo !== false) {
        svg = optimizeSvg(svg, svgoConfig).data
      }

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false
      })

      return `${code}\nexport default { render: render }`
    }
  }
}

module.exports.default = module.exports
