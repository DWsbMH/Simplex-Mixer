<template>
<div>
  <div class="createProblem">
    <div class="row problemEditor">
      <textarea class="textEditor" v-model="problem"></textarea>
      <div class="error">
        {{error}}
      </div>
    </div>
    <div class="row">
      <input type="file" name="uploadProblem" id="uploadProblem" @change="uploadFile" hidden/>
      <label for="uploadProblem" class="createProblemButton">Select file</label>
      <button class="createProblemButton" @click="createProblem">Create problem</button>
    </div>
  </div>
</div>
</template>
<script>
import * as parser from '../assets/js/parser.js'
import example from '../assets/examples/example.txt'
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
      var file = event.target.files[0];
      if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
          vm.problem = e.target.result;
        }
        fileReader.readAsText(file);
      }
    },
    createProblem: function() {
      try {
        this.result = parser.parse(this.problem);
        this.result.rawProblem = this.problem;
        this.$emit('problemReady', this.result);
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  created() {
    this.problem = example;
  }
}
</script>
<style scoped>

.createProblem {
  display: block;
}

.problemEditor {
  margin-bottom: 30px;
}

.textEditor {
  width: 50%;
  height: 200px;
}

.error {
  background-color: red;
  color: white;
  width: 50%;
  margin: auto;
}

.createProblemButton {
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out,
  transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.createProblemButton:hover,
.createProblemButton:focus {
  background: #0053ba;
}

.createProblemButton:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}

.createProblemButton:active {
  transform: scale(0.99);
}
</style>
