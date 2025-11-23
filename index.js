const fs = require('fs').promises
const { compileTemplate } = require('vue/compiler-sfc')
const { optimize: optimizeSvg } = require('svgo')
const _debug = require('debug')

const debug = _debug('vite-svg-loader')

module.exports = function svgLoader (options = {}) {
  const { svgoConfig, svgo, defaultImport } = options

  const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

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

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`
      }

      if (svgo !== false && query !== 'skipsvgo') {
        svg = optimizeSvg(svg, {
          ...svgoConfig,
          path
        }).data
      }

      // To prevent compileTemplate from removing the style tag
      svg = svg.replace(/<style/g, '<component is="style"').replace(/<\/style/g, '</component')

      let defaultTitle = 'undefined'
      const titleMatch = svg.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
      if (titleMatch) {
        defaultTitle = JSON.stringify(titleMatch[1].trim())
        svg = svg.replace(/<title([^>]*)>[\s\S]*?<\/title>/i, (_, attrs) => `<title${attrs} v-if="title">{{ title }}</title>`)
      } else {
        svg = svg.replace(/<svg\b([^>]*)>/i, m => `${m}<title v-if="title">{{ title }}</title>`)
      }

      const { code, map } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: id,
        transformAssetUrls: false
      })

      return {
        code: `${code}\nexport default { render, props: { title: { type: String, default: ${defaultTitle} } } }`,
        map
      }
    }
  }
}

module.exports.default = module.exports
