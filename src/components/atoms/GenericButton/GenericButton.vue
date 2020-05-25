<template>
  <button
    :class="`button generic-button color-${color} size-${size}`"
    @click="click($event)"
    :value="value"
    :id="id">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'generic-button',

  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'inverse-primary', 'green'].includes(value)
      }
    },

    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },

    value: {
      type: String,
      default: ''
    },

    id: {
      type: String,
      default: ''
    }
  },

  methods: {
    click ($event) {
      this.$emit('click', $event.target.value)
    }
  },

}
</script>

<style lang="scss" scoped>
$white: whitesmoke;
$red: #b0042b;
$green: #67C23A;
$dark-green: rgb(91, 172, 51);
$time: all 400ms; 

  .generic-button {
    cursor: pointer;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 40px;
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
    outline: 0;
  }

  .color-primary {
    background-color: $white;
    color: $red;
    border: 1.1px solid $red;
    transition: $time;
  }
  .color-primary:hover {
    background-color: $red;
    color: $white;
  }

  .color-green {
    background-color: $green;
    border: none;
    color: $white;
    transition: $time;
  }
  .color-green:hover {
    background-color: $dark-green;
    color: $white;
  }

  .color-inverse-primary {
    background-color: $red;
    color: $white;
    border: 1.1px solid $red;
    transition: $time;
  }
  .color-inverse-primary:hover {
    background-color: $white;
    color: $red;
  }

  
</style>