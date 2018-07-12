<template>
<div>
  <textarea class="problemEditor" v-model="problem"></textarea>
  <input type="file" id="uploadFile" name="file" @change="uploadFile" />
  <button class="generateProblem" @click="generateProblem" >Generate problem</button>
  <button class="exampleProblem">Example problem</button>
</div>
</template>
<script>
import * as parser from '../assets/js/parser.js'
export default {
  data() {
    return {
      problem: "",
      error: "",
      result: {}
    }
  },
  methods: {
    uploadFile: function(event) {
      var vm = this;
      var file = event.target.files[0]
      if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
          vm.problem = e.target.result;
        }
        fileReader.readAsText(file);
      }
    },
    generateProblem: function() {
      try {
        this.result = parser.parse(this.problem);
        this.$emit('problemReady', this.result);
      } catch(error) {
        this.error = error;
      }
    }
  }
}
</script>
<style scoped>
  .problemEditor {
    width: 350px;
    height: 200px;
  }
</style>
