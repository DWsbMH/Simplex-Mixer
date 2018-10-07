<template>
<div class="app">
  <customHeader></customHeader>
  <userInputHandler v-if="problem === undefined" @problemReady="initProblem"></userInputHandler>
  <firstPhaseSolver ref="firstPhaseSolver" @feasibleSolutionFound="initSecondPhase" v-show="!isSecondPhaseInitialized && problem !== undefined"/>
  <simplexSolver id="secondPhase" ref="simplexSolver" v-show="isSecondPhaseInitialized" ></simplexSolver>
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
      problem: undefined,
      isSecondPhaseInitialized: false
    }
  },
  methods: {
    initProblem: function(problem) {
      // var initialResult = getInitialBase(problem);
      this.problem = problem;
      this.$refs.firstPhaseSolver.getFeasibleSolution(problem);
    },
    initSecondPhase: function(feasibleSolution) {
      this.isSecondPhaseInitialized = true;
      this.$refs.simplexSolver.initProblem(this.problem, feasibleSolution);
    }
  }
}
</script>

<style scoped>

</style>
