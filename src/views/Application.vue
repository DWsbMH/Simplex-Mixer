<template>
<div class="app">
  <userInputHandler v-if="problem === undefined" @problemReady="initProblem"></userInputHandler>
  <firstPhaseSolver ref="firstPhaseSolver" @feasibleSolutionFound="initSecondPhase" v-show="!isSecondPhaseInitialized && problem !== undefined"/>
  <secondPhaseSolver ref="secondPhaseSolver" v-show="isSecondPhaseInitialized"/>
</div>
</template>
<script>
import UserInputHandler from '@/components/UserInputHandler.vue'
import SecondPhaseSolver from '@/components/SecondPhaseSolver.vue'
import FirstPhaseSolver from '@/components/FirstPhaseSolver.vue'
export default {
  components: {
    UserInputHandler,
    SecondPhaseSolver,
    FirstPhaseSolver
  },
  data () {
    return {
      problem: undefined,
      isSecondPhaseInitialized: false
    }
  },
  methods: {
    initProblem: function (problem) {
      this.problem = problem
      this.$refs.firstPhaseSolver.getFeasibleSolution(problem)
    },
    initSecondPhase: function (feasibleSolution) {
      this.isSecondPhaseInitialized = true
      this.$refs.secondPhaseSolver.initSecondPhase(this.problem, feasibleSolution)
    }
  }
}
</script>

<style scoped>

</style>
