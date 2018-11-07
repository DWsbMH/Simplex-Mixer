<template>
<div>
  <div class="description">
    <div>
        You need to find an optimal solution for the following linear programming exercise:
        <div class="lpExcerise" v-if="problem != undefined">
          <code>
            <table class="excerciseTable">
              <tr v-for="(constraint, i) in problem.standardForm.constraints" :key="'constraint' + i">
                <td>
                  s.t.
                </td>
                <td v-for="(variable, i) in problem.structuralVariables" :key="'structuralVariable' + i + variable">
                    {{getIndexAwareSign(constraint[variable], i)}}{{getVariable(constraint[variable], variable)}}
                </td>
                <td v-for="(variable, i) in problem.logicalVariables" :key="'logicalVariable' + i + variable">
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
            {{problem.target}} target:
              <span v-for="(variable, i) in Object.keys(problem.objective)" :key="'objective' + variable">
                {{getIndexAwareSign(problem.objective[variable], i)}}{{problem.objective[variable]}}{{variable}}
              </span>
          </code>
        </div>
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
          <b-container fluid>
            <b-row>
              <resultSaverButton ref="resultSaver" v-bind="optimalSolution"/>
              <b-btn size="sm" variant="primary" href="/">
                New problem
              </b-btn>
            </b-row>
          </b-container>
      </div>
    </b-modal>
  </div>
</div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import SimplexSolver from './SimplexSolver0.vue'
import ResultSaver from './ResultSaver.vue'
export default {
  components: {
    'customHeader': CustomHeader,
    'simplexSolver': SimplexSolver,
    'resultSaverButton': ResultSaver
  },
  data () {
    return {
      optimalSolution: {},
      problem: undefined
    }
  },
  methods: {
    handleSolution: function (optimalSolution) {
      this.optimalSolution = optimalSolution
       this.$root.$emit('bv::show::modal', 'optimalSolutionFoundModal')
    },
    initSecondPhase: function (problem, feasibleSolution) {
      this.problem = problem
      this.$refs.simplexSolver.initProblem(problem, feasibleSolution)
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
    background-color: #f7f7f7;
    padding-top: 15px;
    padding-bottom: 15px;
    vertical-align: middle;
    font: 17px Georgia, serif;
  }
  #optimalSolutionFoundModal .modal-footer {
    justify-content: space-between;
  }
  .lpExcerise {
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .excerciseTable {
    margin: auto;
  }
</style>
