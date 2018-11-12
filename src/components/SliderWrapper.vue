<template>
  <div class="sliderItem"
  @mouseover="activateScalability"
  @mouseleave="deactivateScalability"
  v-on:wheel="handleScroll">
    <div class="vueSlider">
      <!-- {{parseFloat(mutableMax).toFixed(2)}} -->
      <vueSlider
      ref="slider"
      v-model="mutableValue"
      :value="mutableValue"
      :max="mutableMax"
      :interval="interval"
      :disabled="disabled"
      :direction="direction"
      :height="height"
      :width="width"
      :speed="0.0001"
      :formatter="formattedValue"
      :stopPropagation="stopPropagation"
      :processStyle="processStyle"
      :tooltipStyle="tooltipStyle"
      :class="{scrollableClass: scrollable}"
      >
    </vueSlider>
    </div>

  </div>
</template>

<script>
import vueSlider from "vue-slider-component";
export default {
  components: {
    vueSlider
  },
  data() {
    return {
      mutableValue: 0,
      mutableMax: 0,
      stopPropagation: false,
      scrollable: false
    };
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
      default: "vertical",
      type: String
    },
    height: {
      default: 600,
      type: Number
    },
    width: {
      default: 5,
      type: Number
    },
    processStyle: {
      tpye: Object
    },
    tooltipStyle: {
      type: Object
    },
    boundary: {
      type: Number
    }
  },
  model: {
    prop: "value",
    event: "input"
  },
  watch: {
    value: function(newValue) {
      if (this.mutableMax - newValue < 0.5) {
        this.mutableMax += this.mutableMax - newValue;
      }
      this.mutableValue = this.value;
    },
    mutableValue: function(newValue) {
      var value;
      if (this.boundary && this.mutableValue > this.boundary) {
        value = this.boundary;
      } else {
        value = newValue;
      }
      this.$emit("input", value);
      this.$refs.slider.setValue(value);
    },
    max: function() {
      this.mutableMax = this.max;
    }
  },
  computed: {
    formattedValue: function() {
      return parseFloat(this.mutableValue).toFixed(3);
    }
  },
  created: function() {
    this.mutableValue = this.value;
    this.mutableMax = this.max;
  },
  methods: {
    activateScalability: function() {
      // this.scrollable = true;
      // document.documentElement.style.overflow = 'hidden';
      // document.documentElement.style.height = '100%';
      // document.documentElement.style.width = '100%';
    },
    deactivateScalability: function() {
      this.scrollable = false;
      // document.documentElement.style.overflow = 'auto'
    },
    handleScroll: function(event) {
      if (this.scrollable) {
        if (event.deltaY < 0) {
          this.mutableMax++;
        } else if (this.mutableMax - 0.5 >= this.value) {
          this.mutableMax--;
        }
      }
    }
  }
};
</script>
<style scoped>
.sliderItem {
  display: inline-block;
}
.vueSlider {
  margin: 30px;
}
</style>
