<template>
<div>
  <div class="description" v-show="showMessages">
    <h1>First challange!</h1>
    <p>
      You need to a feasible solution. For this, you have to find an optimal solution for the modified problem where the sum of the artifical variables is the target function.
    </p>
  </div>
  <simplexSolver ref="simplexSolver" @optimalSolutionFound="handleSolution"></simplexSolver>
  <div>
    <b-modal id="feasibleSolutionFoundModal" ref="feasibleSolutionFoundModal" title="Congratulations!">
      <p class="my-4">You have found a feasible solution by reducing all artifical variables value to zero.</p>
      <div slot="modal-footer">
        <b-btn size="sm" class="float-right" variant="success" @click="fireFeasibleSolutionFoundEvent">
          Next
        </b-btn>
      </div>
    </b-modal>
    <b-modal id="noFeasibleSolutionModal" ref="noFeasibleSolutionModal" title="Oops!">
      <p class="my-4">Unfortunattely, the given problem has no feasible solution.</p>
      <p class="my-4">Please try another one.</p>
      <div slot="modal-footer">
        <b-btn size="sm" class="float-right" variant="primary" href="/">
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
  data () {
    return {
      hasFeasibleSolution: false,
      showMessages: false,
      modifiedProblem: undefined,
      optimalSolution: undefined
    }
  },
  methods: {
    handleSolution: function(optimalSolution) {
      if (parseFloat(optimalSolution.result).toFixed(5) > 0) {
         this.$root.$emit('bv::show::modal','noFeasibleSolutionModal')
      } else {
        this.optimalSolution = optimalSolution;
        this.$root.$emit('bv::show::modal','feasibleSolutionFoundModal')
      }
    },
    fireFeasibleSolutionFoundEvent: function () {
      this.$refs.feasibleSolutionFoundModal.hide()
      this.hasFeasibleSolution = true
      this.$emit('feasibleSolutionFound', {variables: this.optimalSolution.variables})
    },
    getFeasibleSolution: function (problem) {
      var $this = this;
      if (_.isEqual(problem.logicalVariables, problem.baseVariables)) {
        var variables = $this.createInitialBase(problem, problem.logicalVariables);
        this.$emit('feasibleSolutionFound', {variables: variables})
      } else {
        this.showMessages = true;
        var variables = $this.createInitialBase(problem, problem.baseVariables)
        $this.modifiedProblem = _.cloneDeep(problem);
        $this.modifiedProblem.objective = []
        $this.modifiedProblem.target = 'minimize'
        _.forEach(problem.artificalVariables, function(artificalVariable) {
          $this.modifiedProblem.objective[artificalVariable] = 1
        });
        this.$refs.simplexSolver.initProblem($this.modifiedProblem, {variables: variables});
      }
    },
    createInitialBase: function (problem, variableNames) {
      var variables = []
      _.forEach(variableNames, function(variable) {
          var columnVector = []
          var value
          _.forEach(problem.standardForm.constraints, function(constraint) {
            columnVector.push(constraint[variable])
            if (constraint[variable] != 0) {
              value = constraint['equalTo']
            }
          })
          variables.push({
            name: variable,
            columnVector: columnVector,
            isInBase: true,
            value: value,
            max: value + 2
          })
      });
      _.forEach(problem.variables, function (variable) {
        if (!_.includes(variableNames, variable)) {
          var columnVector = []
          _.forEach(problem.standardForm.constraints, function (constraint) {
            columnVector.push(constraint[variable])
          });
          variables.push({
            name: variable,
            columnVector: columnVector,
            isInBase: false,
            value: 0,
            max: 5
          });
        }
      });
      return variables;
    },
    removeArtificalVariables: function (solution) {
      return _.remove(solution, function (variable, problem) {
        return _.icludes(problem.artificalVariables, variable.name)
      });
    }
  }
}
</script>

<style scoped>
  .description {
    background-color: #f6f6f6;
  }
</style>
