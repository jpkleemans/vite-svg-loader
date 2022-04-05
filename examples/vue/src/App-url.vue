<script setup>
// this component can only be used when defaultImport === 'url'

import { defineAsyncComponent } from 'vue'

import HelloWorld from './components/HelloWorld.vue'
import Test from './assets/test.svg?component'
import testUrl from './assets/test.svg?url'
import testRaw from './assets/test.svg?raw'

// variables are not supported in dynamic imports
// because https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars
// does not support query params
const Async = defineAsyncComponent(() => import(`./assets/circle.svg?component`))
</script>

<template>
  <div id="component">
    <Test class="test-svg" data-animal="bird" aria-hidden="true" />
  </div>

  <div id="image">
    <img src="./assets/test.svg">
  </div>

  <div id="async">
    <Async />
  </div>

  <div id="url">
    {{ testUrl }}
  </div>

  <div id="raw">
    {{ testRaw }}
  </div>

  <div id="root">
    <img src="/root.svg" />
  </div>

  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
