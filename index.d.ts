declare module 'vite-svg-loader' {
  const svgLoader: Function
  export default svgLoader
}

declare module '*.svg' {
  import { Component } from 'vue'
  const src: Component
  export default src
}
