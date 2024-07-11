declare module 'vite-svg-loader' {
  import { Plugin } from 'vite'
  import { Config } from 'svgo'
  import { SFCTemplateCompileOptions } from 'vue/compiler-sfc'
  function svgLoader(options?: { svgoConfig?: Config, svgo?: boolean, defaultImport?: 'url' | 'raw' | 'component', template?: Partial<SFCTemplateCompileOptions> }): Plugin
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

declare module '*.svg?skipsvgo' {
  import { FunctionalComponent, SVGAttributes } from 'vue'
  const src: FunctionalComponent<SVGAttributes>
  export default src
}
