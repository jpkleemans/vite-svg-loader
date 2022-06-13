const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo, defaultImport } = options

  let viteConfig = {}
  const svgRegex = /\.svg(\?(raw|component))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    configResolved (config) {
      viteConfig = config
    },

    async load (id) {
      const root = viteConfig.root;
      const parentDir = root.slice(0,root.lastIndexOf('/'));
      const isRootRef = viteConfig.command === 'build' && !id.startsWith(parentDir);

      if (!id.match(svgRegex) || isRootRef) {
        return
      }

      const [path, query] = id.split('?', 2)

      const importType = query || defaultImport

      if (importType === 'url') {
        return // Use default svg loader
      }

      let svg = await fs.readFile(path, 'utf-8')

      if (importType === 'raw') {
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
