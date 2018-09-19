<template>
  <div class="result">
    <span>Result: </span> {{actualResult}}
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
