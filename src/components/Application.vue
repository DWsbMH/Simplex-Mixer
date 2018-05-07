<template>
<div class="app">
  <div>
    <table class="exercise">
      <tr>
        <td>
          min z =
        </td>
        <td>
          -x1
        </td>
        <td>
          -
        </td>
        <td>
          x2
        </td>
        <td>
          -
        </td>
        <td>
          2x3
        </td>
        <td/>
      </tr>
      <tr>
        <td/>
        <td>
          2x1
        </td>
        <td>
          +
        </td>
        <td>
          x2
        </td>
        <td>
          +
        </td>
        <td>
          x3
        </td>
        <td>
          &lt;= 1
        </td>
      </tr>
      <tr>
        <td/>
        <td/>
        <td/>
        <td>
          x2
        </td>
        <td>
          +
        </td>
        <td>
          2x3
        </td>
        <td>
          &lt;= 3
        </td>
      </tr>
      <tr>
        <td/>
        <td>
          -x1
        </td>
        <td/>
        <td/>
        <td>
          +
        </td>
        <td>
          2x3
        </td>
        <td>
          &lt;= 3
        </td>
      </tr>
    </table>
  </div>
  <div class="slidersContainer">
     <transition-group name="list-complete" tag="div">
      <span class="list-complete-item" v-for="(item, i) in items" :key="item.name">
        {{item.name}}
        <slider v-model="item.value" v-bind="item"></slider>
        <p>
          Value: <br />{{parseFloat(item.value).toFixed(3)}}
        </p>
        <p>
          Reduced value: <br />{{table[table.length-1][items[i].index].toFixed(3)}}
        </p>
        <br/>
      </span>
    </transition-group>
    <br />
    <result v-bind="result"></result>
    <table class="ttts">
      <tr>
        <th/>
        <th v-for="item in items" :key="item.name + 'header'">
          {{item.name}}
        </th>
        <th>
          XB
        </th>
      </tr>
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
import _ from 'lodash'
export default {
  components: {
    'slider': Slider,
    'result': Result
  },
  data() {
    return {
      result: {
        actualResult: 0
      },
      baseIndexes: [],
      table: [
        [2, 1, 1, 1, 0, 0, 1],
        [0, 1, 2, 0, 1, 0, 3],
        [-1, 0, 3, 0, 0, 1, 2],
        [-1, -1, -2, 0, 0, 0, 0],
      ],
      items: [{
          value: 1,
          index: 3,
          name: "y1"
        },
        {
          value: 2,
          index: 4,
          name: "y2"
        },
        {
          value: 3,
          index: 5,
          name: "y3"
        },
        {
          value: 1,
          index: 0,
          name: "x1"
        },
        {
          value: 2,
          index: 1,
          name: "x2"
        },
        {
          value: 3,
          index: 2,
          name: "x3"
        }
      ],
      itemsCopy: []
    }
  },
  watch: {
    items: {
      handler: function(newVal) {
        var i, j;
        var diff = 0;
        var changedItem = this.getChangedItem(newVal, this.items, this.itemsCopy);
        var p;
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
      var i;
      var j = 0;
      for (i = 0; i < items.length; i++) {
        if (items[i][p] > 0) {
          quotients.push({
            rowIndex: i,
            value: items[i][6] / items[i][p]
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
      //alert(this.items[this.baseIndexes[exittingIndex]].name + " exits from the base and " + this.items[changedItem.position].name + " enters for its place.");
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
    }
  },
  created() {
    this.result.actualResult = this.table[3][6];
    this.items[0].value = this.table[0][6];
    this.items[1].value = this.table[1][6];
    this.items[2].value = this.table[2][6];
    this.items[3].value = 0;
    this.items[4].value = 0;
    this.items[5].value = 0;
    this.baseIndexes = [0, 1, 2];

    this.maxDelta = this.getMin(this.getQuotients(this.items, 1));
    this.itemsCopy = _.cloneDeep(this.items);
  }
}
</script>

<style scoped>
.exercise {
  margin: auto;
  margin-bottom: 50px;
}
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
