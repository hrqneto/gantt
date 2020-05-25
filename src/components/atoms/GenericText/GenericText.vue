<template>
  <p 
  class="generic-text"
  :class="[`color-${color}`, `size-${size}`, {'is-bold': isBold}]">
    <slot/>
  </p>
</template>

<script>
export default {
  name: 'generic-text',

  props: {
    color: {
      type: String,
      default: 'black',
      validator: function (value) {
        return ['black', 'gray', 'red', 'white'].includes(value)
      }
    },
    
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },

    isBold: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .color-black {
    color: black;
  }

  .color-gray {
    color: gray;
  }

  .color-red {
    color: #880221;
  }

  .color-white {
    color: white;
  }

  .small {
    font-size: 10px;
  }

  .medium {
    font-size: 12px;
  }
  
  .large {
    font-size: 16px;
  }

  .is-bold {
    font-weight: bold;
  }
</style>