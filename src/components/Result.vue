<template>
  <div class="result">
    <span id="objectiveFunctionValue" class="resultText">Objective function value: </span> {{parseFloat(actualResult).toFixed(3)}}
    <b-popover target="objectiveFunctionValue" triggers="hover">
       objective function.
       <a href="https://en.wikipedia.org/wiki/Reduced_cost" target="_blank">See more.</a>
   </b-popover>
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
    margin-top: 20px;
    font-size: 20px;
  }
  .resultText {
    font: 25px Georgia, serif;
  }
</style>
