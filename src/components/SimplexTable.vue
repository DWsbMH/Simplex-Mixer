<template>
  <div class="tableContainer">
    <div class="card">
      <div class="card-header customFont">
        {{getPanelTitle()}}
      </div>
      <div class="card-body">
        <table class="ttts">
          <tr>
            <th></th>
            <th v-for="variable in variables" :key="variable.name">
              {{variable.name}}
            </th>
          </tr>
          <tr v-for="i in getBaseSize()">
            <td>
              {{variables[i-1].name}}
            </td>
            <td v-for="variable in variables" :key="variable.name + (i-1)">
              {{variable.columnVector[i-1].toFixed(3)}}
            </td>
          </tr>
          <tr>
            <td>
              Reduced costs:
            </td>
            <td v-for="(variable, i) in variables" :key="variable.name + 'reducedCost' + (i-1)">
              {{variable.reducedCost.toFixed(3)}}
            </td>
          </tr>
      </table>
      <div class="objectiveFunctionValue customFont">
        Actual objective function value: {{actualObjectiveValue.toFixed(3)}}
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'SimplexTable',
  props: {
    variables: Array,
    actualObjectiveValue: Number,
    iterationNumber: {
      type: Number
    }
  },
  methods: {
    getPanelTitle: function() {
      return this.iterationNumber != undefined ? this.iterationNumber + ". iteration" : "Initial state";
    },
    getBaseSize: function() {
      var $this = this;
      var baseSize = _.filter($this.variables, function(variable) {
        return variable.isInBase;
      }).length;
      return baseSize;
    }
  }
}
</script>
<style scoped>
.tableContainer {
  margin-top: 15px;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
.ttts {
  border-collapse: collapse;
}
.ttts td, .ttts th {
  padding: 5px;
}
.ttts, .ttts th, .ttts td {
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid black;
}
.customFont {
  font-family: Georgia, serif;
}
</style>
