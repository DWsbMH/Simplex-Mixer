<template>
<div class="app">
  <customHeader></customHeader>
  <userInputHandler v-if="problem === undefined" @problemReady="initProblem"></userInputHandler>
  <simplexSolver ref="simplexSolver" v-show="problem !== undefined" ></simplexSolver>
</div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import UserInputHandler from './UserInputHandler.vue'
import SimplexSolver from './SimplexSolver.vue'
import _ from 'lodash'
export default {
  components: {
    'customHeader': CustomHeader,
    'userInputHandler': UserInputHandler,
    'simplexSolver': SimplexSolver
  },
  data() {
    return {
      problem: undefined
    }
  },
  methods: {
    initProblem: function(problem) {
      this.$refs.simplexSolver.initProblem(problem);
      this.problem = problem;
    }
  }
}
</script>

<style scoped>

</style>
