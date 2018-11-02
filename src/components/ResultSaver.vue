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
      var blob = new Blob([this.createResultJson()], {type: "application/json"});
      saveAs(blob, "result.json");
    },
    createResultJson: function() {
      var result = {
        problem: {
          constraints: this.getConstraints(this.problem),
          objective: this.problem.objective,
          target: this.problem.target
        },
        hasFeasibleSolution: true,
        optimalSolution: {
          variableValue: this.getOptimalSolutionVariableValues(this.variables),
          objectiveFunctionValue: this.result
        }
      };
      return JSON.stringify(result)
    },
    getConstraints: function(problem) {
      var constraints = [];
      var $this = this;
      _.forEach(problem.originalForm.constraints, function(constraint) {
        constraints.push($this.getConstraint(constraint, problem.structuralVariables));
      });
      return constraints;
    },
    getConstraint: function(constraint, structuralVariables) {
      var relation = this.getRelation(constraint);
      return {
        leftSide: this.getLeftSide(constraint, structuralVariables),
        rightSide: constraint[relation],
        relation: relation
      }
    },
    getLeftSide: function(constraint, structuralVariables) {
      var leftSide = {};
      _.forEach(structuralVariables, function(variable) {
        leftSide[variable] = constraint[variable];
      });
      return leftSide;
    },
    getRelation: function(constraint) {
      var relation;
      _.forEach(_.keys(constraint), function(key) {
        if (key === "min" || key === 'max' || key === 'equalTo') {
          relation = key;
        }
      });
      return relation;
    },
    getOptimalSolutionVariableValues: function(variables) {
      var variableValues = {};
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
