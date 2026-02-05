declare module 'vite-svg-loader' {
  import type { Plugin } from 'vite'
  import type { Config } from 'svgo'
  function svgLoader(options?: { svgoConfig?: Config, svgo?: boolean, defaultImport?: 'url' | 'raw' | 'component' }): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  import type { defineComponent, SVGAttributes } from 'vue'
  export const render: Function
  interface SVGComponentProps extends SVGAttributes {
    title?: string
  }
  const component: ReturnType<typeof defineComponent<SVGComponentProps>>
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
  import type { defineComponent, SVGAttributes } from 'vue'
  export const render: Function
  interface SVGComponentProps extends SVGAttributes {
    title?: string
  }
  const component: ReturnType<typeof defineComponent<SVGComponentProps>>
  export default component
}
