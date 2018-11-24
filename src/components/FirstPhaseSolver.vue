<template>
<div>
  <div class="description" v-show="showMessages">
    <h3>First challange!</h3>
    <p>
      You need to a feasible solution. For this, you have to find an optimal solution for
      the modified problem where the sum of the artifical variables is the objective function.
    </p>
    <div v-if="modifiedProblem != undefined">
        <linearProgrammingExercise
          :constraints="modifiedProblem.standardForm.constraints"
          target="minimize"
          :objective="modifiedProblem.objective"
          :structuralVariables="modifiedProblem.structuralVariables"
          :logicalVariables="modifiedProblem.logicalVariables"
          :artificalVariables="modifiedProblem.artificalVariables"
          ></linearProgrammingExercise>
    </div>
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
import SimplexSolver from "./SimplexSolver.vue";
import LinearProgrammingExercise from "./LinearProgrammingExercise.vue";
import _ from "lodash";
export default {
  components: {
    simplexSolver: SimplexSolver,
    linearProgrammingExercise: LinearProgrammingExercise
  },
  data() {
    return {
      hasFeasibleSolution: false,
      showMessages: false,
      modifiedProblem: undefined,
      optimalSolution: undefined
    };
  },
  methods: {
    handleSolution: function(optimalSolution) {
      if (this.isObjectiveFunctionValueZero(optimalSolution.result)) {
        this.optimalSolution = optimalSolution;
        this.$refs.feasibleSolutionFoundModal.show();
      } else {
        this.$refs.noFeasibleSolutionModal.show();
      }
    },
    isObjectiveFunctionValueZero: function(result) {
      return parseFloat(result).toFixed(5) == 0;
    },
    fireFeasibleSolutionFoundEvent: function() {
      this.$refs.feasibleSolutionFoundModal.hide();
      this.hasFeasibleSolution = true;
      this.$emit("feasibleSolutionFound", {
        variables: this.optimalSolution.variables
      });
    },
    getFeasibleSolution: function(problem) {
      var variables = this.createInitialBase(problem);
      if (this.areOnlyLogicalVariablesInBase(problem)) {
        this.$emit("feasibleSolutionFound", { variables: variables });
      } else {
        this.showMessages = true;
        this.modifiedProblem = _.cloneDeep(problem);
        this.modifiedProblem.target = "minimize";
        this.populateNewObjective(problem.artificalVariables);
        this.$refs.simplexSolver.initProblem(this.modifiedProblem, {
          variables: variables
        });
      }
    },
    areOnlyLogicalVariablesInBase: function(problem) {
      return _.isEqual(problem.logicalVariables, problem.baseVariables);
    },
    populateNewObjective: function(artificalVariables) {
      var $this = this;
      $this.modifiedProblem.objective = {};
      _.forEach(artificalVariables, function(artificalVariable) {
        $this.modifiedProblem.objective[artificalVariable] = 1;
      });
    },
    createInitialBase: function(problem) {
      var variables = [];
      this.populateBaseVariables(problem, variables);
      this.populateNonBaseVariables(problem, variables);
      return variables;
    },
    populateBaseVariables: function(problem, variables) {
      _.forEach(problem.baseVariables, function(variable) {
        var columnVector = [];
        var value = 0;
        _.forEach(problem.standardForm.constraints, function(constraint) {
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
    },
    populateNonBaseVariables: function(problem, variables) {
      _.forEach(problem.variables, function(variable) {
        if (!_.includes(problem.baseVariables, variable)) {
          var columnVector = [];
          _.forEach(problem.standardForm.constraints, function(constraint) {
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
    },
    removeArtificalVariables: function(solution) {
      return _.remove(solution, function(variable, problem) {
        return _.icludes(problem.artificalVariables, variable.name);
      });
    }
  }
};
</script>

<style scoped>
.description {
  background-color: #f6f6f6;
  padding: 15px;
}
</style>
