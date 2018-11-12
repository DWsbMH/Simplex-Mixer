<template>
<footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        Copyright &copy;2018 Tamas Biczo
      </div>
      <div class="col-md-4">

      </div>
      <div class="col-md-4">
        <font-awesome-icon :icon="['fab', 'github']" size="lg"></font-awesome-icon>
        <a href="https://github.com/DWsbMH/Simplex-Mixer"> GitHub</a>
      </div>
    </div>
  </div>
</footer>
</template>
<script>
export default {};
</script>
<style scoped>
.footer {
  width: 100%;
  height: auto;
  background-color: #202020;
  color: #666666;
  padding: 15px;
  opacity: 0.9;
}
.footer a {
  text-decoration: none;
  color: #666666;
  transition: color 0.15s;
}
</style>
