<template>
  <div id="app">
    <customHeader></customHeader>
    <router-view/>
  </div>
</template>

<script>
import CustomHeader from './components/CustomHeader.vue'
export default {
  components: {
    'customHeader': CustomHeader
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Open Sans', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
