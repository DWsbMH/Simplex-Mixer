<template>
<div>
    <div class="container slidersContainer">
        <transition-group name="list-complete" tag="div">
          <div class="vueSliderContainer list-complete-item" v-for="(variable, i) in variables" :key="variable.name">
            <div class="variableName" :class="{baseVariable: variable.isInBase}">
              {{variable.name}}
            </div>
            <sliderWrapper v-model="variable.value" v-bind="variable" :disabled="isDisabled(variable)"/>
            <div>
              {{variable.reducedCost.toFixed(3)}}
            </div>
          </div>
        </transition-group>
        <result v-bind="result"></result>
    </div>
    <div class="tablesContainer">
      <div class="container tablesContainer" ref="tablesContainer"></div>
    </div>
    <div class="container">
      <chartHandler ref="chartHandler"/>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import Result from './Result.vue'
import SliderWrapper from './SliderWrapper.vue'
import ChartHandler from './ChartHandler.vue'
import SimplexTable from './SimplexTable.vue'
import vueSlider from 'vue-slider-component'
import _ from 'lodash'
import math from 'mathjs'
export default {
  components: {
    'sliderWrapper': SliderWrapper,
    'result': Result,
    'chartHandler': ChartHandler,
    'simplexTable': SimplexTable,
    vueSlider
  },
  data() {
    return {
      result: {
        actualResult: 0
      },
      variables: [],
      variablesCopy: [],
      maxStep: undefined,
      problem: {},
      changingVariable: undefined,
      iterationCounter: 0
    }
  },
  watch: {
    variables: {
      handler: function(newVal) {
        var changedVariable = this.getChangedVariable(newVal, this.variables, this.variablesCopy);
        if (!_.isUndefined(changedVariable)) {
           this.changingVariable = changedVariable.name;
           this.variables[changedVariable.position].boundary = this.getMaxStep(changedVariable);
           this.result.actualResult += changedVariable.difference * changedVariable.reducedCost;
           var exittingVariable = this.transformVariables(changedVariable);
           this.$refs.chartHandler.addResult(this.result.actualResult, this.variables);
           if(!_.isUndefined(exittingVariable)) {
             this.doBaseChange(changedVariable, exittingVariable);
             this.generateNewBase(changedVariable);
             this.populateReducedCosts(this.problem);
             this.addTable(++this.iterationCounter);
             this.maxStep = undefined;
             this.changingVariable = undefined;
             var isOptimalSolution = _.every(this.variables, function(variable) {
               return variable.reducedCost >= 0;
             });
             if (isOptimalSolution) {
               console.log("optimalFound");
               var optimalSolution = {
                 variables: _.cloneDeep(this.variables),
                 result: this.result.actualResult
               }
               this.$emit('optimalSolutionFound', optimalSolution);
             }
           }
        }
        this.variablesCopy = _.cloneDeep(this.variables);
      },
      deep: true
    }
  },
  methods: {
    initProblem: function(problem, feasibleSolution) {
      var variablesInBase = [];
      var externalVariables = [];
      var $this = this;

      $this.problem = problem;
      $this.variables = feasibleSolution.variables;

      _.forEach($this.variables, function(variable) {
        var multiplier = problem.objective[variable.name] != undefined ? problem.objective[variable.name] : 0;
        $this.result.actualResult += multiplier * variable.value;
      });
      $this.$refs.chartHandler.init($this.result.actualResult, $this.variables);
      this.populateReducedCosts(problem);
      $this.addTable(undefined);
      $this.variablesCopy = _.cloneDeep($this.variables);
    },
    addTable: function(iterationCounter) {
      var ComponentClass = Vue.extend(SimplexTable)
      var instance = new ComponentClass({
          propsData: {
            variables: _.cloneDeep(this.variables),
            iterationNumber: iterationCounter
          }
      })
      instance.$mount() // pass nothing
      this.$refs.tablesContainer.appendChild(instance.$el)
    },
    populateReducedCosts: function(problem) {
      var cTB = [];
      _.forEach(this.variables, function(variable) {
        if (variable.isInBase) {
          cTB.push(problem.objective[variable.name] != undefined ? problem.objective[variable.name] : 0);
        }
      });

      _.forEach(this.variables, function(variable) {
        var reducedCost = 0;
        if (!variable.isInBase) {
          var c = problem.objective[variable.name] != undefined ? problem.objective[variable.name] : 0;
          // console.log(variable.name, c, "-", cTB, variable.columnVector);
          reducedCost = c - math.multiply(cTB, variable.columnVector);
        }
        variable.reducedCost = reducedCost;
      });
    },
    getChangedVariable: function(newVal, variables, variablesCopy) {
      var result;
      for (var i = 0; i < variables.length; i++) {
        if (variables[i].value != variablesCopy[i].value) {
          result = {
            name: variables[i].name,
            difference: variables[i].value - variablesCopy[i].value,
            reducedCost: variables[i].reducedCost,
            position: i,
            columnVector: variables[i].columnVector
          }
        }
      }
      return result;
    },
    getMaxStep: function(changedVariable) {
      var $this = this;
      if (_.isUndefined(this.maxStep)) {
        var quotiens = this.getQuotients(changedVariable.columnVector);
        this.maxStep = this.getMin(quotiens.map(quotient => quotient.value));
        var quotient = quotiens.find(function(quotient){
          return quotient.value == $this.maxStep;
        });
        this.p = quotient.position;
      }
      return this.maxStep;
    },
    getQuotients: function(columnVector) {
      var quotients = [];
      var baseValue;
      for (var i = 0; i < columnVector.length; i++) {
        if (columnVector[i] > 0) {
          baseValue = this.variables[i].isInBase ? this.variables[i].value : 0;
          quotients.push({
            value: baseValue / columnVector[i],
            position: i
          });
        }
      }
      if (quotients.length == 0) {
        alert("The solution doesn't have any boundary!");
      }
      return quotients;
    },
    getMin: function(items) {
      return Math.min(...items);
    },
    transformVariables: function(changedVariable) {
      var variable;
      var exittingVariable;
      for (var i = 0; i < this.variables.length; i++) {
        variable = this.variables[i];
        if (variable.isInBase) {
          // console.log(variable.name,variable.value, "-", changedVariable.difference, "*", changedVariable.columnVector[i]);
          var newValue = variable.value - changedVariable.difference * changedVariable.columnVector[i];
          if (parseFloat(newValue).toFixed(3) > 0) {
            variable.value = newValue;
          } else {
            variable.value = 0;
            exittingVariable = {
              name: variable.name,
              position: i
            }
          }
          variable.boundary = undefined;
        }
      }
      return exittingVariable;
    },
    doBaseChange: function(changedVariable, exittingVariable) {
      var tmp = this.variables[exittingVariable.position];
      this.variables[exittingVariable.position] = this.variables[changedVariable.position];
      this.variables[exittingVariable.position].isInBase = true;
      this.variables[changedVariable.position] = tmp;
      this.variables[changedVariable.position].isInBase = false;
      this.removeExittingVariableIfNeccessary(this.variables[changedVariable.position]);
    },
    generateNewBase: function(changedVariable) {
      var generalElem = changedVariable.columnVector[this.p];
      // calculate general element row
      for (var i = 0; i < this.variables.length; i++) {
          this.variables[i].columnVector[this.p] *= (1/generalElem);
      }
      // generate rows except the general element row
      for (var i = 0; i < this.variables.length; i++) {
        if (this.variables[i].name !== changedVariable.name) {
          for(var j = 0; j < this.variables[i].columnVector.length; j++) {
            if (this.p !== j) {
              this.variables[i].columnVector[j] -= changedVariable.columnVector[j] * this.variables[i].columnVector[this.p];
            }
          }
        }
      }
      // calculate general element column
      var variable = this.variables.find(function(variable){
        return variable.name == changedVariable.name;
      });
      for(var j = 0; j < variable.columnVector.length; j++) {
        if (this.p !== j) {
          variable.columnVector[j] -= changedVariable.columnVector[j] * variable.columnVector[this.p];
        }
      }
    },
    isDisabled: function(variable) {
      return variable.isInBase || (!_.isUndefined(this.changingVariable) && this.changingVariable != variable.name);
    },
    removeExittingVariableIfNeccessary: function(variable) {
      var index;
      for (var i = 0; i < this.variables.length; i++) {
        if (this.variables[i].name === variable.name) {
          index = i;
        }
      }
      if (_.includes(this.problem.artificalVariables, variable.name) || _.includes(this.problem.logicalVariables, variable.name)) {
        this.variables.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.variableName {
  color: blue;
  font: 17px Georgia, serif;
}
.baseVariable {
  color: green;
}
.vueSliderContainer {
  display: inline-block;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
{
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.tablesContainer {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #2980b9;
}
.slidersContainer {
  padding: 15px;
}
</style>
