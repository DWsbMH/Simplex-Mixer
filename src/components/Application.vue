<template>
<div class="app">
  <customHeader></customHeader>
  <userInputHandler v-if="problem === undefined" @problemReady="initProblem"></userInputHandler>
  <firstPhaseSolver ref="firstPhaseSolver" @feasibleSolutionFound="initSecondPhase" v-show="!isSecondPhaseInitialized && problem !== undefined"/>
  <secondPhaseSolver ref="secondPhaseSolver" v-show="isSecondPhaseInitialized"/>
</div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import UserInputHandler from './UserInputHandler.vue'
import SecondPhaseSolver from './SecondPhaseSolver.vue'
import FirstPhaseSolver from './FirstPhaseSolver.vue'
export default {
  components: {
    'customHeader': CustomHeader,
    'userInputHandler': UserInputHandler,
    'secondPhaseSolver': SecondPhaseSolver,
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
      this.problem = problem;
      this.$refs.firstPhaseSolver.getFeasibleSolution(problem);
    },
    initSecondPhase: function(feasibleSolution) {
      this.isSecondPhaseInitialized = true;
      this.$refs.secondPhaseSolver.initSecondPhase(this.problem, feasibleSolution);
    }
  }
}
</script>

<style scoped>

</style>
