<template>
<div class="saveButton">
  <b-btn size="sm" variant="success" @click="saveResult">
    Save
  </b-btn>
</div>
</template>
<script>
import _ from 'lodash'
import saveAs from 'file-saver';
export default {
  data () {
    return {

    }
  },
  props: {
    variables: Array,
    result: Number,
    problem: Object
  },
  methods: {
    saveResult: function () {
      console.log(this.variables, this.result, this.problem);
      var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
      //saveAs(blob, "hello world.txt");
    },
    createResultJson: function() {
        return {
          problem: {
            constraints: getConstraints(this.problem),
            objective: this.problem.objective,
            target: this.problem.target
          },
          hasFeasibleSolution: true,
          optimalSolution: {
            variableValue: getOptimalSolutionVariableValues(this.variables),
            objectiveFunctionValue: this.result
          }
        }
    },
    getConstraints: function(problem) {
      var constraints = [];
      _.forEach(problem.constraints, function(constraint) {
        constraints.push(getConstraint(constraint, problem.structuralVariables));
      });
      return constraints;
    },
    getConstraint: function(constraint, structuralVariables) {
      return {
        leftSide: getLeftSide(constraint, structuralVariables),
        rightSide: constraint["equalTo"],
        relation: ""
      }
    },
    getLeftSide: function(constraint, structuralVariables) {
      var leftSide = [];
      _.forEach(structuralVariables, function(variable) {
        leftSide[variable] = constraint[variable];
      });
      return leftSide;
    },
    getOptimalSolutionVariableValues: function(variables) {
      var variableValues = [];
      _.forEach(variables, function(variable) {
        variableValues[variable.name] = variable.value;
      });
      return variableValues;
    }
  }
}
</script>

<style scoped>
  .saveButton {
    margin-right: 5px;
  }
</style>
