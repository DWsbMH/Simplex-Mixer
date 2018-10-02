<template>
<div class="app">
  <customHeader></customHeader>
  <userInputHandler v-if="problem === undefined" @problemReady="initProblem"></userInputHandler>
  <firstPhaseSolver ref="firstPhaseSolver"/>
  <simplexSolver ref="simplexSolver" v-show="problem !== undefined" ></simplexSolver>
</div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import UserInputHandler from './UserInputHandler.vue'
import SimplexSolver from './SimplexSolver0.vue'
import FirstPhaseSolver from './FirstPhaseSolver.vue'
import {getInitialBase} from '../assets/js/initialBaseGenerator.js'
export default {
  components: {
    'customHeader': CustomHeader,
    'userInputHandler': UserInputHandler,
    'simplexSolver': SimplexSolver,
    'FirstPhaseSolver': FirstPhaseSolver
  },
  data() {
    return {
      problem: undefined
    }
  },
  methods: {
    initProblem: function(problem) {
      var initialResult = getInitialBase(problem);
    //  if (initialResult.status === 5) {
      console.log(this.$refs.firstPhaseSolver.getFeasibleSolution(problem));
      this.$refs.simplexSolver.initProblem(problem, initialResult.result.vars);
      this.problem = problem;
      // } else {
      //   alert("The given problem hasn't any solution");
      // }
    }
  }
}
</script>

<style scoped>

</style>
