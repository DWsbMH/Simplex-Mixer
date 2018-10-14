<template>
<div>
  <div class="description">
    <div class="container innerContainer">
      <p>
        You need to find an optimal solution.
      </p>
    </div>
  </div>
  <simplexSolver ref="simplexSolver" @optimalSolutionFound="handleSolution"></simplexSolver>
  <div>
    <b-modal id="optimalSolutionFoundModal" title="Congratulations!">
      <b-container fluid>
        <b-row class="text-center">
          <p class="my-4">You have found an optimal solution.</p>
        </b-row>
        <b-row>
          Result: {{optimalSolution.result}}
        </b-row>
        <b-row v-for="(variable) in optimalSolution.variables" :key="variable.name">
          <b-col>{{variable.name}}</b-col>
          <b-col>{{parseFloat(variable.value).toFixed(3)}}</b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <b-btn size="sm" class="float-left" variant="success">
          Save
        </b-btn>
        <b-btn size="sm" class="float-right" variant="primary" href="/">
          New problem
        </b-btn>
      </div>
    </b-modal>
  </div>
</div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import SimplexSolver from './SimplexSolver0.vue'
import _ from 'lodash'
export default {
  components: {
    'customHeader': CustomHeader,
    'simplexSolver': SimplexSolver
  },
  data() {
    return {
      optimalSolution: {}
    }
  },
  methods: {
    handleSolution: function(optimalSolution) {
      this.optimalSolution = optimalSolution;
       this.$root.$emit('bv::show::modal','optimalSolutionFoundModal')
    },
    initSecondPhase: function(problem, feasibleSolution) {
      this.$refs.simplexSolver.initProblem(problem, feasibleSolution);
    }
  }
}
</script>

<style scoped>
  .description {
    background-color: #f7f7f7;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 0px;
    font: 17px Georgia, serif;
  }
</style>
