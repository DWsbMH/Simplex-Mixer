<template>
<div>
  <div>
    <p>
      You need to find an optimal solution.
    </p>
  </div>
  <simplexSolver ref="simplexSolver" @optimalSolutionFound="handleSolution"></simplexSolver>
  <div>
    <b-modal id="optimalSolutionFoundModal" title="Congratulations!">
      <p class="my-4">You have found an optimal solution.</p>
      <div slot="modal-footer">
        <b-btn size="sm" class="float-right" variant="success">
          Next
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

    }
  },
  methods: {
    handleSolution: function(optimalSolution) {
       this.$root.$emit('bv::show::modal','optimalSolutionFoundModal')
    },
    initSecondPhase: function(problem, feasibleSolution) {
      this.$refs.simplexSolver.initProblem(problem, feasibleSolution);
    }
  }
}
</script>

<style scoped>

</style>
