const fs = require('fs').promises
const { compileTemplate } = require('vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')
const _debug = require('debug')

const debug = _debug('vite-svg-loader')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo, defaultImport } = options

  const svgRegex = /\.svg(\?(raw|component|skipsvgo|base64))?(\=([a-z]+))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      const regexResult = id.match(svgRegex);
      if (! regexResult) {
        return
      }

      const [path] = id.split('?', 2)
      const query = regexResult[2]
      const parameter = regexResult[4]
      
      const importType = query || defaultImport

      if (importType === 'url') {
        return // Use default svg loader
      }

      let svg

      try {
        svg = await fs.readFile(path, 'utf-8')
      } catch (ex) {
        debug('\n', `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`)

        return
      }

      if (parameter){
          svg = svg.replace(/<svg/, `<svg class="${parameter}" `)
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`
      }

      if (importType === 'base64') {
        return `export default ${JSON.stringify(btoa(svg))}`
      }

      if (svgo !== false && query !== 'skipsvgo') {
        svg = optimizeSvg(svg, {
          ...svgoConfig,
          path
        }).data
      }

      // To prevent compileTemplate from removing the style tag
      svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component')

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
