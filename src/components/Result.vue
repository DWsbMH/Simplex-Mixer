<template>
  <div class="result">
    <span>Result: </span> {{parseFloat(actualResult).toFixed(3)}}
  </div>
</template>
<script>
export default {
  props: {
    actualResult: Number
  }
}
</script>
<style scoped>
  .result {
    display: inline-block;
  }
</style>
