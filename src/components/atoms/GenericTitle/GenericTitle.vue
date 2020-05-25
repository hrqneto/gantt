<template>
  <h2
    :class="`generic-title color-${color} size-${size}`">
    <slot/>
  </h2>
</template>

<script>
export default {
  name: 'generic-title',

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
    font-size: 16px;
  }

  .medium {
    font-size: 20px;
  }
  
  .large {
    font-size: 24px;
  }
</style>