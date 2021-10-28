<script setup lang="ts">
/// <reference path="../index.d.ts" />
import { defineAsyncComponent } from "vue";

import HelloWorld from "./components/HelloWorld.vue";
import Test from "./assets/test.svg?component";
import testUrl from "./assets/test.svg?url";
import testRaw from "./assets/test.svg?raw";

const name = "circle";
const Async = defineAsyncComponent(() => import(`./assets/${name}.svg`));
</script>

<template>
  <div id="component">
    <Test class="test-svg" />
  </div>

  <div id="image">
    <img src="./assets/test.svg?url">
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

  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>
