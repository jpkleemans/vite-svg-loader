import { Plugin } from 'vite'
import { OptimizeOptions } from 'svgo'
import { FunctionalComponent, SVGAttributes } from 'vue'

declare module 'vite-svg-loader' {
  function svgLoader(options?: { svgoConfig?: OptimizeOptions, svgo?: boolean, defaultImport?: 'url' | 'raw' | 'component' }): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  const src: FunctionalComponent<SVGAttributes>
  export default src
}

declare module '*.svg?url' {
  const src: string
  export default src
}

declare module '*.svg?raw' {
  const src: string
  export default src
}

declare module '*.svg?skipsvgo' {
  const src: FunctionalComponent<SVGAttributes>
  export default src
}
