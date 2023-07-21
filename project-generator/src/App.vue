<template>
  <Generator />
</template>

<script>
import Generator from './components/Generator.vue'

export default {
  name: 'App',
  components: {
    Generator
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html, body {
  margin: 0;
  height: 100%;
  background: #F9F9F9;
}
.container {
  padding-top: 20px;
}
</style>
