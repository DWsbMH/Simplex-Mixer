<template>
  <div class="container customHeader">
    <div class="row">
      <div class="float-left">
        <img class="logo" src="../assets/img/logo.png" />
        <span class="appTitle">Simplex Mixer</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as parser from '../assets/js/parser.js'
import example from '../assets/examples/example.txt'
export default {
  data() {
    return {
    }
  }
}
</script>
<style scoped>
  .customHeader {
  }

  .appTitle {
    font-size: 24px;
    margin: auto;
  }
  .logo {
    width: 50px;
    height: 66px;
  }
</style>
