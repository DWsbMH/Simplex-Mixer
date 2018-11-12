<template>
  <div class="container syntax">
      <div class="centeredSection">
        <div class="icon">
            <font-awesome-icon icon="receipt" size="4x"></font-awesome-icon>
        </div>
        <h2>Syntax</h2>
        <div>
          The linear programming exercise have to be defined in GMPL (GNU Mathematical Programming Language)
          <br/>
          For examples and the syntax please check the
          <a href="https://en.wikibooks.org/wiki/GLPK/GMPL_(MathProg)">official documentation</a>
        </div>
      </div>
      <div class="section">
        Other constraints for the model definition:
        <ul>
          <li>
            You can't use varaibles which hasn't declared yet.
          </li>
          <li>
            The name of the constraints shouldn be unique.
          </li>
          <li>
            The name of the constraints shouldn be unique.
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.syntax {
  margin-top: 50px;
  margin-bottom: 50px;
  width: 60%;
}
.section {
  margin-top: 10px;
  text-align: left;
}
.icon {
  margin-bottom: 20px;
}
</style>
