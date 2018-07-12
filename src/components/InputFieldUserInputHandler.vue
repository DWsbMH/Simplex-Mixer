<template>
<div class="inputFields">
  <div class="aMatrix">
    {{aMatrix[0][0]}}
      A:
    <table>
      <tr>
        <td v-for="index in numberOfColumn" :key="index + 'heading'">
          {{ index &lt;= numberOfColumn/2 ? 'x'+index : 'y' + (index - numberOfColumn/2) }}
        </td>
      </tr>
      <tr v-for="row in numberOfRow" :key="row + 'row'">
        <td v-for="column in numberOfColumn" :key="row + '' + column + 'input'">
          <input type="number" class="numberInput" step="0.01" @change="setValue($event, row, column)" />
        </td>
      </tr>
    </table>
    <button @click="numberOfColumn+=2">Add column</button>
    <button @click="numberOfRow++">Add row</button>
  </div>
  <div class="c">
      C:
      <input v-for="c in (numberOfColumn / 2)" :key="'c' + c" type="number" class="numberInput" step="0.01" @change="setVectorValue($event, cVector, c)"/>
  </div>
  <div class="x">
      X:
      <input v-for="x in numberOfRow" :key="'x' + x" type="number" class="numberInput" step="0.01" @change="setVectorValue($event, xVector, x)" />
  </div>
  <button >Done</button>
</div>
</template>
<script>
export default {
  data () {
    return {
      numberOfRow: 3,
      numberOfColumn: 6,
      aMatrix: [[],[],[]],
      cVector: [],
      xVector: []
    }
  },
  methods: {
    setValue: function(event, row, column) {
      if (_.isUndefined(this.aMatrix[row-1])) {
        this.aMatrix[row-1] = [];
      }
      this.aMatrix[row-1][column-1] = event .target.value;
    },
    setVectorValue: function(event, vector, index) {
      vector[index] = event.target.value;
    },
    setNumberOfRows: function() {
      console.log(this.aMatrix);
      this.aMatrix[this.numberOfRow] = [];
      this.numberOfRow++;
    }
  }
}
</script>
<style scoped>
  .inputFields {
    display: inline-block;
  }
  .numberInput {
    width: 55px;
  }
  .x, .c {
    margin-top: 15px;
  }
</style>
