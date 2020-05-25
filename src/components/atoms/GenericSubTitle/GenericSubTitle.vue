<template>
  <h3
    :class="`generic-sub-title color-${color} size-${size}`">
    <slot/>
  </h3>
</template>

<script>
export default {
  name: 'generic-sub-title',

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
  .generic-sub-title {
    opacity: 50%;
  }

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
    font-size: 6px;
  }

  .medium {
    font-size: 8px;
  }
  
  .large {
    font-size: 10px;
  }
</style>