<template>
<div>
  <div class="description">
    <div>
        You need to find an optimal solution for the following linear programming exercise:
        <div class="lpExcerise" v-if="problem != undefined">
          <linearProgrammingExercise
            :constraints="problem.standardForm.constraints"
            :target="problem.target"
            :objective="problem.objective"
            :structuralVariables="problem.structuralVariables"
            :logicalVariables="problem.logicalVariables"
            ></linearProgrammingExercise>
        </div>
    </div>
  </div>
  <simplexSolver ref="simplexSolver" @optimalSolutionFound="handleSolution"></simplexSolver>
  <div>
    <b-modal id="optimalSolutionFoundModal" ref="optimalSolutionFoundModal" title="Congratulations!">
      <b-container fluid>
        <b-row class="text-center">
          <p class="my-4">You have found an optimal solution.</p>
        </b-row>
        <b-row>
          Result: {{optimalSolution.result}}
        </b-row>
        <b-row v-for="(variable) in optimalSolution.variables" :key="variable.name">
          <b-col>{{variable.name}}</b-col>
          <b-col>{{parseFloat(variable.value).toFixed(3)}}</b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
          <b-container fluid>
            <b-row>
              <resultSaverButton ref="resultSaver" v-bind="optimalSolution"/>
              <b-btn size="sm" variant="primary" :href="baseUrl">
                New problem
              </b-btn>
            </b-row>
          </b-container>
      </div>
    </b-modal>
  </div>
</div>
</template>
<script>
import SimplexSolver from "./SimplexSolver.vue";
import ResultSaver from "./ResultSaver.vue";
import LinearProgrammingExercise from "./LinearProgrammingExercise.vue";
export default {
  components: {
    simplexSolver: SimplexSolver,
    resultSaverButton: ResultSaver,
    linearProgrammingExercise: LinearProgrammingExercise
  },
  data() {
    return {
      optimalSolution: {},
      problem: undefined,
      baseUrl: process.env.BASE_URL
    };
  },
  methods: {
    handleSolution: function(optimalSolution) {
      this.optimalSolution = optimalSolution;
      this.$refs.optimalSolutionFoundModal.show();
    },
    initSecondPhase: function(problem, feasibleSolution) {
      this.problem = problem;
      this.$refs.simplexSolver.initProblem(problem, feasibleSolution);
    }
  }
};
</script>

<style scoped>
.description {
  background-color: #f7f7f7;
  padding-top: 15px;
  padding-bottom: 15px;
  vertical-align: middle;
  font: 17px Georgia, serif;
}
#optimalSolutionFoundModal .modal-footer {
  justify-content: space-between;
}
.lpExcerise {
  margin-top: 15px;
  margin-bottom: 15px;
}
.excerciseTable {
  margin: auto;
}
</style>
