<template>
<div class="app">
  <userInputHandler v-if="problem == undefined" @problemReady="initProblem"></userInputHandler>
  <div v-if="problem != undefined" class="slidersContainer">
     <transition-group name="list-complete" tag="div">
      <span class="list-complete-item" v-for="(item, i) in items" :key="item.name">
        {{item.name}}
        <slider v-model="item.value" v-bind="item" :disabled="isIdInBase(i)"></slider>
        <p>
          Value: <br />{{parseFloat(item.value).toFixed(3)}}
        </p>
        <p>
          Reduced cost: <br />{{table[table.length-1][items[i].index].toFixed(3)}}
        </p>
        <br/>
      </span>
    </transition-group>
    <br />
    <result v-bind="result"></result>
    <table class="ttts">
      <tr v-for="i in table.length" :key="i + '. row'">
        <th>
          {{items[baseIndexes[i-1]] ? items[baseIndexes[i-1]].name : "dT"}}
        </th>
        <td v-for="(item, index) in table[i-1]" :key="i + 'row' + index + 'column'">
          {{item.toFixed(3)}}
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import Result from './Result.vue'
import Slider from './Slider.vue'
import SampleExercise from './SampleExercise.vue'
import UserInputHandler from './UserInputHandler.vue'
import _ from 'lodash'
export default {
  components: {
    'slider': Slider,
    'result': Result,
    'sampleExersice': SampleExercise,
    'userInputHandler': UserInputHandler
  },
  data() {
    return {
      problem: undefined,
      result: {
        actualResult: 0
      },
      baseIndexes: [],
      table: [],
      items: [],
      itemsCopy: []
    }
  },
  watch: {
    items: {
      handler: function(newVal) {
        var changedItem = this.getChangedItem(newVal, this.items, this.itemsCopy);
        console.log(changedItem);
        if (!_.isUndefined(changedItem)) {
          var context = this.getContext(changedItem);
          this.items[changedItem.position].boundary = context.maxDelta;
          this.result.actualResult += context.difference * this.table[this.table.length-1][context.generalElemColumnIndex];
          this.updateSliders(changedItem, context);
          var exittingIndex = this.getIndexWithZeroValue(this.baseIndexes, this.items);
          if(!_.isUndefined(exittingIndex)) {
            this.updateSliderOrder(changedItem, exittingIndex);
            this.updateTable(context);
          }
        }
        this.itemsCopy = _.cloneDeep(this.items);
      },
      deep: true
    }
  },
  methods: {
    initProblem: function(problem) {
      this.problem = problem;
      var $table = [];
      for(var i=0; i < problem.A.length; i++) {
        var row = problem.A[i];
        var extraVariableValues = [];
        for(var j=0; j < row.length; j++) {
          extraVariableValues[j] = i == j ? 1 : 0;
        }
        var rowWithExtraValues = _.concat(row, extraVariableValues);
        rowWithExtraValues[rowWithExtraValues.length] = problem.constraints[i] != undefined ? problem.constraints[i] : 0;
        $table.push(rowWithExtraValues);
      }
      var item = {};
      for (var i = 0; i <  $table[0].length-1; i++) {
        if (i < ($table[0].length-1) / 2) {
          item.id = i;
          item.value = $table[i][$table[0].length-1];
          item.max = $table[i][$table[0].length-1];
          item.index = ($table[0].length-1) / 2 + i;
          item.name = "y"+i;
          this.baseIndexes.push(i);
        } else {
          item.id = i;
          item.value = 0;
          item.index = i - ($table[0].length-1) / 2;
          item.name = problem.variables[i - ($table[0].length-1) / 2];
        }
        this.items.push(item);
        item = {};
      }
      this.table = $table;
      this.result.actualResult = 0;
      this.itemsCopy = _.cloneDeep(this.items);
    },
    getChangedItem: function(newVal, items, itemsCopy) {
      var result;
      var i;
      for (i = 0; i < newVal.length; i++) {
        if (items[i].value != itemsCopy[i].value) {
          result = {
            position: i,
            index: items[i].index
          };
        }
      }
      return result;
    },
    getContext: function(changedItem) {
      var quotiens = this.getQuotients(this.table, changedItem.index);
      if (quotiens.length == 0) {
        alert("The solution doesn't have any boundary!");
      }
      console.log(quotiens);
      var maxDelta = this.getMin(quotiens.map(quotient => quotient.value));
      var quotient = quotiens.find(function(quotient){
        return quotient.value == maxDelta;
      });
      return {
        maxDelta: maxDelta,
        generalElemRowIndex: quotient.rowIndex,
        generalElemColumnIndex: changedItem.index,
        difference: this.items[changedItem.position].value - this.itemsCopy[changedItem.position].value
      }
    },
    getMin: function(items) {
      return Math.min(...items);
    },
    getQuotients: function(items, p) {
      var quotients = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i][p] > 0) {
          console.log(items[i][items[0].length-1], "/", items[i][p]);
          quotients.push({
            rowIndex: i,
            value: items[i][items[0].length-1] / items[i][p]
          });
        }
      }
      return quotients;
    },
    updateSliders: function(changedItem, context) {
      var i;
      for (i = 0; i < this.items.length; i++) {
        if (i != changedItem.position && _.includes(this.baseIndexes, i)) {
          var rowIndex = _.indexOf(this.baseIndexes, i);
          var newValue = this.items[i].value - (context.difference * this.table[rowIndex][context.generalElemColumnIndex]);
          if (newValue > 0) {
            this.items[i].value = newValue;
          } else {
            this.items[i].value = 0;
          }
        }
      }
    },
    updateSliderOrder: function(changedItem, exittingIndex) {
      var tmp = this.items[this.baseIndexes[exittingIndex]];
      this.items[this.baseIndexes[exittingIndex]] = this.items[changedItem.position];
      this.items[changedItem.position] = tmp;
    },
    updateTable: function(context) {
      var i, j;
      var generalRowIndex = context.generalElemRowIndex;
      var generalColIndex = context.generalElemColumnIndex;
      var generalElem = this.table[generalRowIndex][generalColIndex];
      for(i = 0; i < this.table[0].length; i++) {
        this.table[generalRowIndex][i] = generalElem != 0 ? (1 / generalElem) * this.table[generalRowIndex][i] : 0;
      }
      for(i = 0; i < this.table.length; i++) {
        if ( i != generalRowIndex) {
          for(j = 0; j < this.table[0].length; j++) {
            if (j != generalColIndex) {
              this.table[i][j] -= this.table[i][generalColIndex] * this.table[generalRowIndex][j];
            }
          }
        }
      }
     for(i = 0; i < this.table.length; i++) {
       if ( i != generalRowIndex) {
         this.table[i][generalColIndex] -= this.table[i][generalColIndex] * this.table[generalRowIndex][generalColIndex];
       }
     }
    },
    getIndexWithZeroValue: function(baseIndexes, items) {
      var result;
      var i;
      for(i=0; i < baseIndexes.length; i++) {
        if (parseFloat(items[baseIndexes[i]].value).toFixed(3) == 0) {
          result = i;
        }
      }
      return result;
    },
    isIdInBase: function(sliderId) {
      return _.includes(this.baseIndexes, sliderId);
    }
  }
}
</script>

<style scoped>
.vueSlider {
  display: inline-block;
}
.slidersContainer {
  height: 300px;
}
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
.ttts {
  border-collapse: collapse;
}
.ttts td, .ttts th {
  padding: 5px;
}
.ttts, .ttts th, .ttts td {
  margin: auto;
  margin-bottom: 50px;
  border: 1px solid black;
}
</style>
