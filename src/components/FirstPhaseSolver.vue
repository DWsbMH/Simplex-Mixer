<template>
<div>
  <div class="description" v-show="showMessages">
    <h3>First challange!</h3>
    <p>
      You need to a feasible solution. For this, you have to find an optimal solution for
      the modified problem where the sum of the artifical variables is the objective function.
    </p>
    <div v-if="modifiedProblem != undefined">
      Modified linear programming exercise:
        <code>
          <table class="excerciseTable">
            <tr v-for="(constraint, i) in modifiedProblem.standardForm.constraints" :key="'constraint' + i">
              <td>
                s.t.
              </td>
              <td v-for="(variable, i) in modifiedProblem.structuralVariables" :key="'structuralVariable' + i + variable">
                  {{getIndexAwareSign(constraint[variable], i)}}{{getVariable(constraint[variable], variable)}}
              </td>
              <td v-for="(variable, i) in modifiedProblem.logicalVariables" :key="'logicalVariable' + i + variable">
                  {{getSign(constraint[variable], i)}}{{getVariable(constraint[variable], variable)}}
              </td>
              <td v-for="(variable, i) in modifiedProblem.artificalVariables" :key="'artificalVariable' + i + variable">
                  {{getSign(constraint[variable], i)}}{{getVariable(constraint[variable], variable)}}
              </td>
              <td>
                =
              </td>
              <td>
                {{constraint['equalTo']}}
              </td>
            </tr>
          </table>
        </br>
        minimize target:
        <span v-for="(variable, i) in Object.keys(modifiedProblem.objective)" :key="'objective' + variable">
          <span v-if="i != 0">+</span> {{variable}}
        </span>
      </code>
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
        $this.modifiedProblem.objective = {}
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
    },
    getIndexAwareSign: function(variableValue, index) {
      return (variableValue != undefined && index != 0 && variableValue > 0) ? '+' : ''
    },
    getSign: function(variableValue, index) {
      return (variableValue != undefined && variableValue > 0) ? '+' : ''
    },
    getVariable: function(variableValue, variableName) {
      var variable = ''
      if (variableName != undefined && variableName !== 'equalTo') {
        if (variableValue > 1 || variableValue < -1) {
          variable = variableValue + variableName
        } else if (variableValue == 1) {
          variable = variableName
        } else if (variableValue == -1) {
          variable = '-' + variableName
        }
      }
      return variable
    }
  }
}
</script>

<style scoped>
  .description {
    background-color: #f6f6f6;
    padding: 15px;
  }
  .excerciseTable {
    margin: auto;
  }
</style>
