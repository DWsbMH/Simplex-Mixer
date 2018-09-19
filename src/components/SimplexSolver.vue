<template>
<div class="slidersPanel row">
     <!-- <transition-group name="list-complete" tag="div" hidden>
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
    </transition-group> -->
    <div class="container">
        <transition-group name="list-complete" tag="div" class="slidersContainer">
          <div class="vueSliderContainer list-complete-item" v-for="(item, i) in items" :key="item.name + 'ff'">
            {{item.name}}</br></br>
            <sliderWrapper v-model="item.value" v-bind="item" :disabled="isIdInBase(i)"></sliderWrapper>
            <p>
              {{table[table.length-1][items[i].index].toFixed(3)}}
            </p>
          </div>
        </transition-group>
      <div class="tttsContainer">
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
      <result v-bind="result"></result>
      <div>
        {{test()}}
      </div>
      </div>
    </div>
</div>
</template>
<script>
import Result from './Result.vue'
import Slider from './Slider.vue'
import SliderWrapper from './SliderWrapper.vue'
import SampleExercise from './SampleExercise.vue'
import vueSlider from 'vue-slider-component'
import _ from 'lodash'
import glpk from 'glpk.js'
import {getInitialBase} from '../assets/js/initialBaseGenerator.js'
export default {
  components: {
    'slider': Slider,
    'sliderWrapper': SliderWrapper,
    'result': Result,
    vueSlider
  },
  data() {
    return {
      result: {
        actualResult: 0
      },
      baseIndexes: [],
      table: [],
      items: [],
      itemsCopy: [],
      value: 2
    }
  },
  watch: {
    items: {
      handler: function(newVal) {
        var changedItem = this.getChangedItem(newVal, this.items, this.itemsCopy);
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
    test: function() {
      return getInitialBase();
    },
    initProblem: function(problem) {
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
        item.id = i;
        if (i < ($table[0].length-1) / 2) {
          item.value = $table[i][$table[0].length-1];
          item.max = $table[i][$table[0].length-1] + 2;
          item.index = ($table[0].length-1) / 2 + i;
          item.name = "y"+i;
          item.processStyle = {"backgroundColor": "green"};
          this.baseIndexes.push(i);
        } else {
          item.value = 0;
          item.index = i - ($table[0].length-1) / 2;
          item.name = problem.variables[i - ($table[0].length-1) / 2];
          item.max = 15;
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
      for (i = 0; i < items.length; i++) {
        if (items[i].value != itemsCopy[i].value) {
          console.log(items[i].value, "<-", itemsCopy[i].value);
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
          //console.log(items[i][items[0].length-1], "/", items[i][p]);
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
      var actItem;
      for (i = 0; i < this.items.length; i++) {
        actItem = this.items[i];
        if (i != changedItem.position && _.includes(this.baseIndexes, i)) {
          var rowIndex = _.indexOf(this.baseIndexes, i);
          var newValue = actItem.value - (context.difference * this.table[rowIndex][context.generalElemColumnIndex]);
          if (newValue > 0) {
            actItem.value = newValue;
          } else {
            actItem.value = 0;
          }
          actItem.boundary = undefined;
        }
      }
    },
    updateSliderOrder: function(changedItem, exittingIndex) {
      var tmp = this.items[this.baseIndexes[exittingIndex]];
      this.items[this.baseIndexes[exittingIndex]] = this.items[changedItem.position];
      this.items[this.baseIndexes[exittingIndex]].processStyle = {"backgroundColor": "green"};
      this.items[changedItem.position] = tmp;
      this.items[changedItem.position].processStyle = null;
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
.slidersContainer {
  display: inline-block;
}
.tttsContainer {
  display: inline-block;
}
.vueSliderContainer {
  display: inline-block;
}
.vueSlider {
  margin: 30px;
}
.slidersPanel {
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
