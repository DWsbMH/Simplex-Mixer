<template>
  <div class="greyBackground">
    <div class="container about">
        <div class="icon">
          <font-awesome-icon icon="paper-plane" size="4x"></font-awesome-icon>
        </div>
        <h2>About</h2>
        <div>
          Simplex Mixer is an open-source linear programming solver interface.</br>
          The aim of the application is to give a different approach to understand the step of the optimalization in the simplex method.
          It needs the user interaction during the linear programming exercise solving.
        </div>
        <div class="section">
          This application was created for a degree thesis at Széchenyi István University.
        </div>
      <div class="contact">
        <div class="icon">
          <font-awesome-icon :icon="['far', 'envelope']" size="4x"></font-awesome-icon>
        </div>
        <h2>Contact</h2>
        <div>
          If you have any question, improvement idea or a bug report then please don't hesitate to contact me. </br>
          I appreciate every feedback.
          <div class="section">
            <div>
              Email me: <strong>biczo.tamas@gmail.com</strong>
            </div>
            or
            <div>
              Create an issue on GitHub: <a href="https://github.com/DWsbMH/Simplex-Mixer/issues/new" target="_blank">New issue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .greyBackground {
    background-color: #f2f2f2;
  }
  .about {
    padding: 40px;
    width: 60%;
  }
  .section {
    margin-top: 10px;
  }
  .contact {
    margin-top: 50px;
  }
  .icon {
    margin-bottom: 20px;
  }
</style>
