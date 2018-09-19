<template>
  <div class="slidecontainer">
    <input type="range"
      min="0"
      :max="max"
      :step="step"
      :value="value"
      @input="change"
      :disabled="disabled"
      orient="vertical"
      class="slider"/>
  </div>
</template>

<script>
export default {
  name: "slider",
  props: {
    name: String,
    value: {
      default: 0,
      type: [Number, String]
    },
    max: {
      default: 4,
      type: Number
    },
    step: {
      default: 0.001,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    boundary: {
      default: this.max,
      type: Number
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  methods: {
    change: function(event) {
      var newValue;
      if(this.boundary && event.target.value > this.boundary) {
        newValue = this.boundary;
        event.target.value = this.boundary;
        event.preventDefault();
      } else {
        newValue = event.target.value;
      }
      this.$emit('input', newValue);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slidecontainer {
  text-align: center;
  font-size: 15px;
  width: 80%;
  margin-left: 15px;
  margin-right: auto;
  margin-top: 30px;
}

.slider {
  writing-mode: bt-lr; /* IE */
  -webkit-appearance: slider-vertical;
  height: 500px;
  width: 20px;
  /* margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px; */
  display: inline-block;
  opacity: 0.7;
  background: #d3d3d3;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 5px;
  /*transform: rotate(270deg);*/
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #4CAF50;
    cursor: pointer;
    border-radius: 50%;
}

</style>
