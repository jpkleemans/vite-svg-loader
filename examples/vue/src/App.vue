<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Test from './assets/test.svg'
import testUrl from './assets/test.svg?url'
import testRaw from './assets/test.svg?raw'
</script>

<template>
  <Test class="test-svg" />

  <img src="./assets/test.svg?url">

  <div>{{ testUrl }}</div>
  <div>{{ testRaw }}</div>
 
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
