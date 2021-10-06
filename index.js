const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')
const { createFilter } = require('@rollup/pluginutils');

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo, include, exclude } = options

  const svgRegex = /\.svg(\?(raw|url|component))?$/

  const filter = createFilter(include, exclude);

  return {
    name: 'svg-loader',
    enforce: 'pre',

    resolveid (id) {
      return id.match(svgRegex) && filter(id) ? id : null
    },

    async load (id) {
      if (!id.match(svgRegex) || !filter(id)) {
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
      if (!id.match(svgRegex) || !filter(id)) {
        return
      }

      const [path, query] = id.split('?', 2)

      if (query === 'component' || query === undefined) {
        let svg = await fs.readFile(path, 'utf-8')

        if (svgo !== false) {
          svg = optimizeSvg(svg, svgoConfig).data
        }

        const { code } = compileTemplate({
          id: JSON.stringify(id),
          source: svg,
          filename: path,
          transformAssetUrls: false
        })

        return `${code}\nexport default render`
      }

      return `export default ${JSON.stringify(src)}`
    }
  }
}

module.exports.default = module.exports
