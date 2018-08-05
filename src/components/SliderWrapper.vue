<template>
  <div>
    <vue-slider class="vueSlider"
    ref="slider"
    v-model="mutableValue"
    :value="mutableValue"
    :max="max"
    :interval="interval"
    :disabled="disabled"
    :direction="direction"
    :height="height"
    :width="width"
    :speed="0.0001"
    :formatter="formattedValue"
    :stopPropagation="stopPropagation"
    :processStyle="processStyle"
    ></vue-slider>
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
export default {
  components: {
    vueSlider
  },
  data() {
    return {
      mutableValue: 0,
      stopPropagation: false
    }
  },
  props: {
    value: {
      default: 0,
      type: [Number, String]
    },
    max: {
      default: 4,
      type: Number
    },
    interval: {
      default: 0.001,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    direction: {
      type: String
    },
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    processStyle: {
      tpye: Object
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
  watch: {
    value: function(newValue) {
      this.mutableValue = this.value;
    },
    mutableValue: function(newValue) {
      var value;
      if(this.boundary && this.mutableValue > this.boundary) {
        value = this.boundary;
      } else {
        value = newValue;
      }
      this.$emit('input', value);
      this.$refs.slider.setValue(value)
    }
  },
  computed: {
    formattedValue: function() {
      return parseFloat(this.mutableValue).toFixed(3);
    }
  },
  created: function() {
    this.mutableValue = this.value;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vueSlider {
    margin: 30px;
  }
</style>
