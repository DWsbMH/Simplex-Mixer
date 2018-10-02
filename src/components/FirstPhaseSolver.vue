<template>
<div>

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
      variables: []
    }
  },
  methods: {
    getFeasibleSolution: function(problem) {
      var $this = this;
      var variables = [];
      if (_.isEqual(problem.artificalVariables.sort(), problem.logicalVariables.sort())) {
        variables = $this.createInitialBaseFromLogicalVariables(problem);
      }
      return variables;
    },
    createInitialBaseFromLogicalVariables: function(problem) {
      var variables = [];
      _.forEach(problem.logicalVariables, function(variable) {
          var columnVector = [];
          var value;
          _.forEach(problem.constraints, function(constraint) {
            columnVector.push(constraint[variable]);
            if (constraint[variable] != 0) {
              value = constraint[variable];
            }
          });
          variables.push({
            name: variable,
            columnVector: columnVector,
            isInBase: true,
            value: value
          });
      });
      _.forEach(problem.variables, function(variable) {
        if (!_.includes(problem.logicalVariable, variable)) {
          var columnVector = [];
          _.forEach(problem.constraints, function(constraint) {
            columnVector.push(constraint[variable]);
          });
          variables.push({
            name: variable,
            columnVector: columnVector,
            isInBase: false,
            value: 0
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
