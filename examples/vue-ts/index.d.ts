declare module 'vite-svg-loader' {
  import { Plugin } from 'vite'
  function svgLoader(options?: { svgoConfig?: Object, svgo?: boolean }): Plugin
  export default svgLoader
}

declare module '*.svg?component' {
  import { Component } from 'vue'
  const src: Component
  export default src
}

declare module '*.svg?url' {
  const src: String
  export default src
}

declare module '*.svg?raw' {
  const src: String
  export default src
}
