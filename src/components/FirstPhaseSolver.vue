<template>
<div>
  <div v-show="showMessages">
    <h1>First challange!</h1>
    <p>
      You need to a feasible solution. For this, you have to find an optimal solution for the modified problem where the sum of the artifical variables is the target function.
    </p>
  </div>
  <simplexSolver ref="simplexSolver" @optimalSolutionFound="handleSolution"></simplexSolver>
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
      hasFeasibleSolution: false,
      showMessages: false
    }
  },
  methods: {
    handleSolution: function(optimalSolution) {
      this.hasFeasibleSolution = true;
      this.$emit('feasibleSolutionFound', {variables: optimalSolution});
    },
    getFeasibleSolution: function(problem) {
      var $this = this;
      if (_.isEqual(problem.logicalVariables, problem.baseVariables)) {
        var variables = $this.createInitialBase(problem, problem.logicalVariables);
        this.$emit('feasibleSolutionFound', {variables: variables});
      } else {
        this.showMessages = true;
        var variables = $this.createInitialBase(problem, problem.baseVariables);
        $this.modifiedProblem = _.cloneDeep(problem);
        $this.modifiedProblem.objective = [];
        $this.modifiedProblem.target = "minimize";
        _.forEach(problem.artificalVariables, function(artificalVariable) {
          $this.modifiedProblem.objective[artificalVariable] = 1;
        });
        this.$refs.simplexSolver.initProblem($this.modifiedProblem, {variables: variables});
      }
    },
    createInitialBase: function(problem, variableNames) {
      var variables = [];
      _.forEach(variableNames, function(variable) {
          var columnVector = [];
          var value;
          _.forEach(problem.constraints, function(constraint) {
            columnVector.push(constraint[variable]);
            if (constraint[variable] != 0) {
              value = constraint["equalTo"];
            }
          });
          variables.push({
            name: variable,
            columnVector: columnVector,
            isInBase: true,
            value: value,
            max: value + 2
          });
      });
      _.forEach(problem.variables, function(variable) {
        if (!_.includes(variableNames, variable)) {
          var columnVector = [];
          _.forEach(problem.constraints, function(constraint) {
            columnVector.push(constraint[variable]);
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
    }
  }
}
</script>

<style scoped>

</style>
