<template>
  <div id="app">
    <customHeader/>
    <router-view/>
    <customFooter/>
  </div>
</template>

<script>
import CustomHeader from './components/CustomHeader.vue'
import CustomFooter from './components/CustomFooter.vue'
export default {
  components: {
    'customHeader': CustomHeader,
    'CustomFooter': CustomFooter
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
.tooltip > .tooltip-inner {
  color: black;
  background-color: white;
  border: 1px solid #ccc
}
.tooltip.bs-tooltip-bottom .arrow:before {
  border-bottom-color: #76cdd8 !important;
}
.tooltip:hover {
  visibility: visible;
}
</style>
