<template>
  <div class="result">
    <table>
      <tr>
        <td class="tableRowTitle">
          Actual result:
        </td>
        <td>
          {{actualResult}}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    actualResult: Number
  }
}
</script>
<style scoped>
  .result {
    margin-top:30px;
  }

  .result table{
    border: 2px solid black;
    display: inline-block;
  }

  .tableRowTitle {
    font-weight: bold;
  }
</style>
