# Vite SVG loader
Vite 2.x plugin to use SVG files as Vue components.

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
