# Vite SVG loader
SVG loader for Vite 2.x

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
npm i vite-svg-loader
```

### Setup

#### `vite.config.js`

```js
import svgLoader from 'vite-svg-loader'

export default {
  plugins: [vue(), svgLoader()]
}
```
