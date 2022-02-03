declare module 'vite-svg-loader' {
  import { Plugin } from 'vite'
  import { OptimizeOptions } from 'svgo'
  function svgLoader(options?: { svgoConfig?: OptimizeOptions, svgo?: boolean, setSvgPath?: boolean }): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  import { FunctionalComponent, SVGAttributes } from 'vue'
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
