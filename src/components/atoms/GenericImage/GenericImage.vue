<template>
  <div class="generic-image">
    <img
      :src="src"
      alt="">
  </div>
</template>

<script>
export default {
  name: 'generic-image',

  props: {
    
    imageName: {
      type: String,
      default: ''
    },

    isExternal: {
      type: Boolean,
      default: false
    }

  },

  computed: {
    src () {
      if (this.isExternal) {
        return this.imageName
      }
      return require(`@/assets/images/${this.name}.png`)
    }
  }
}
</script>
