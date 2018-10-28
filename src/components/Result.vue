<template>
  <div class="result">
    <span class="resultText">Objective function value: </span> {{parseFloat(actualResult).toFixed(3)}}
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
    margin-top: 20px;
    font-size: 20px;
  }
  .resultText {
    font: 25px Georgia, serif;
  }
</style>
