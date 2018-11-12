<template>
<div>
  <div class="createProblem">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col col-md-10 text-center">
          <div class="row ">
            <div class="problemEditor col-md-12">
              <codemirror class="codeEditor" v-model="problem" :options="codeMirrorOptions"></codemirror>
              <div class="error">
                {{error}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col col-md-10">
          <button class="createProblemButton customButton float-left" @click="createProblem">Create problem</button>
          <div class="customButton float-right">
            <input type="file" name="uploadProblem" id="uploadProblem" @change="uploadFile" hidden/>
            <label for="uploadProblem" class="createProblemButton">Upload problem</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <grammarSyntax></grammarSyntax>
  <about></about>
</div>
</template>
<script>
import parser from "../assets/js/parser2.js";
import example from "../assets/examples/example0.txt";
import { codemirror } from "vue-codemirror-lite";
import grammarSyntax from "./GrammarSyntax.vue";
import about from "./About.vue";
require("codemirror/mode/javascript/javascript");
export default {
  components: {
    codemirror,
    grammarSyntax,
    about
  },
  data() {
    return {
      problem: "",
      error: "",
      result: {},
      codeMirrorOptions: {
        language: "javascript",
        viewportMargin: Infinity,
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2
      }
    };
  },
  methods: {
    uploadFile: function(event) {
      var vm = this;
      var file = event.target.files[0];
      if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
          vm.problem = e.target.result;
        };
        fileReader.readAsText(file);
      }
    },
    createProblem: function() {
      try {
        this.result = parser.parse(this.problem);
        this.result.rawProblem = this.problem;
        this.$emit("problemReady", this.result);
      } catch (error) {
        this.error = error.message;
      }
    }
  },
  created() {
    this.problem = example;
  }
};
</script>
<style scoped>
.createProblem {
  background-color: #2980b9;
}
.problemEditor {
  margin-bottom: 30px;
  margin-top: 30px;
}
.codeEditor {
  text-align: left;
  height: auto;
}
.codeEditor >>> .CodeMirror {
  height: auto;
}
.textEditor {
  width: 100%;
  height: 400px;
  padding: 10px;
  font-family: "Consolas";
}
.error {
  background-color: #dc3545;
  color: white;
  width: 100%;
  margin: auto;
}
.createProblemButton {
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  text-decoration: none;
  background: #58cd58;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}
.createProblemButton:hover,
.createProblemButton:focus {
  background: #7fd97f;
}
.createProblemButton:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}
.createProblemButton:active {
  transform: scale(0.99);
}
</style>
