declare module 'vite-svg-loader' {
  import { Plugin } from 'vite'
  import { Config } from 'svgo'
  function svgLoader(options?: { svgoConfig?: Config, svgo?: boolean, defaultImport?: 'url' | 'raw' | 'component' }): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  import { DefineComponent, SVGAttributes } from 'vue'
  interface SVGComponentProps extends SVGAttributes {
    title?: string
  }
  const component: DefineComponent<SVGComponentProps>
  export default component
}

declare module '*.svg?url' {
  const src: string
  export default src
}

declare module '*.svg?raw' {
  const svg: string
  export default svg
}

declare module '*.svg?skipsvgo' {
  import { DefineComponent, SVGAttributes } from 'vue'
  interface SVGComponentProps extends SVGAttributes {
    title?: string
  }
  const component: DefineComponent<SVGComponentProps>
  export default component
}
