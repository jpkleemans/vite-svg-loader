# Vite SVG loader
Vite 2.x plugin to load SVG files as Vue components, using SVGO for optimization.

<a href="https://www.npmjs.com/package/vite-svg-loader" target="_blank"><img src="https://img.shields.io/npm/v/vite-svg-loader?style=flat-square" alt="Version"></a>
<a href="https://www.npmjs.com/package/vite-svg-loader" target="_blank"><img src="https://img.shields.io/npm/dw/vite-svg-loader?style=flat-square" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vite-svg-loader" target="_blank"><img src="https://img.shields.io/npm/l/vite-svg-loader?style=flat-square" alt="License"></a>

```vue
<template>
  <MyIcon />
</template>

<script setup>
import MyIcon from './my-icon.svg'
</script>
```

### Install
```bash
npm install vite-svg-loader --save-dev
```

### Setup

#### `vite.config.js`
```js
import svgLoader from 'vite-svg-loader'

export default {
  plugins: [vue(), svgLoader()]
}
```

### SVGO Configuration

#### `vite.config.js`
```js
svgLoader({
  svgoConfig: {
    multipass: true
  }
})
```

### Disable SVGO
#### `vite.config.js`
```js
svgLoader({
  svgo: false
})
```

### Use with TypeScript
If you use the loader in a Typescript project, you'll need to import your svg files with the `?component` param: `import MyIcon from './my-icon.svg?component'`.
You'll also need to add the type definitions to `src/vite-env.d.ts`:

#### `src/vite-env.d.ts`
```diff
    /// <reference types="vite/client" />
+   /// <reference types="vite-svg-loader" />
```
