<template>
<div ref="resultChart" id="resultChart"/>
</template>
<script>
import c3 from 'c3'
import 'c3/c3.min.css'
import _ from 'lodash'
export default {
  data () {
    return {
      chart: {},
      chartData: ['result'],
      variables: {}
    }
  },
  methods: {
    addResult: function (newResult, newVariables) {
      var $this = this
      this.chartData.push(newResult)
      _.forEach(newVariables, function(variable) {
        $this.variables[variable.name] = variable.value
      })
      $this.chart.load({
        columns: [
          this.chartData
        ],
        tooltip: {
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                  return '<div>Show what you want</div>'
          }
        }
      });
    },
    init: function (initalResult, variables) {
      var $this = this
      $this.chartData.push(initalResult)
      setTimeout(function () {
        $this.chart = c3.generate({
          bindto: $this.$refs.resultChart,
          data: {
            columns: [
              $this.chartData
            ]
          }
        });
      }, 100)
    }
  }
}
</script>

<style scoped>
</style>
