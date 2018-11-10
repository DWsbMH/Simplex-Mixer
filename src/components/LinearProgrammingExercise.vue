<template>
  <div>
      <code>
        <table class="excerciseTable">
          <tr v-for="(constraint, i) in constraints" :key="'constraint' + i">
            <td>
              s.t.
            </td>
            <td v-for="(variable, i) in structuralVariables" :key="'structuralVariable' + i + variable">
                {{getIndexAwareSign(constraint[variable], i)}}&nbsp;{{getVariable(constraint[variable], variable)}}&nbsp;
            </td>
            <td v-for="(variable, i) in logicalVariables" :key="'logicalVariable' + i + variable">
                {{getSign(constraint[variable])}}&nbsp;{{getVariable(constraint[variable], variable)}}&nbsp;
            </td>
            <td v-for="(variable, i) in artificalVariables" :key="'artificalVariable' + i + variable">
                {{getSign(constraint[variable])}}&nbsp;{{getVariable(constraint[variable], variable)}}&nbsp;
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
      {{target}} target:
      <span v-for="(variable, i) in Object.keys(objective)" :key="'objective' + variable">
        {{getIndexAwareSign(objective[variable], i)}}&nbsp;{{getVariable(objective[variable], variable)}}
      </span>
    </code>
  </div>
</template>
<script>
export default {
  props: {
    constraints: Array,
    target: String,
    objective: Object,
    structuralVariables: {
      default: () => [],
      type: Array
    },
    logicalVariables: {
      default: () => [],
      type: Array
    },
    artificalVariables: {
      default: () => [],
      type: Array
    }
  },
  methods: {
    getIndexAwareSign: function(variableValue, index) {
      return (variableValue != undefined && index != 0 && variableValue > 0) ? '+' : ''
    },
    getSign: function(variableValue) {
      return (variableValue != undefined && variableValue > 0) ? '+' : ''
    },
    getVariable: function(variableValue, variableName) {
      var variable = ''
      if (variableName != undefined && variableName !== 'equalTo') {
        if (variableValue > 1) {
          variable = variableValue + variableName
        } else if (variableValue < -1) {
          variable = '- ' + Math.abs(variableValue) + variableName
        } else if (variableValue == 1) {
          variable = variableName
        } else if (variableValue == -1) {
          variable = '- ' + variableName
        }
      }
      return variable
    }
  }
}
</script>
<style scoped>
  .excerciseTable {
    margin: auto;
  }
</style>
