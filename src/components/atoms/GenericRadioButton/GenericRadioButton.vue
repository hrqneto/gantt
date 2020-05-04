<template>
  <div class="generic-radio-button">
    <el-radio-group text-color="#ffff" fill="#b0042b" v-model="selected" :change="sendValue(selected)" :size="size">
      <el-radio-button
        v-for="item in items" 
        :key="item.id" 
        :id="item.id" 
        :label="item.label"
      ></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'generic-radio-button',

  data () {
    return {
      selected: 'Dia'
    }
  },

  props: {
    color: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'inverse-primary'].includes(value)
      }
    },

    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['mini', 'small', 'medium'].includes(value)
      }
    },

    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    sendValue (selected) {
      this.$emit('selected', selected)
    }
  },

}
</script>

<style lang="scss" scoped>
  $white: whitesmoke;
  $red: #b0042b;
  $time: all 400ms; 

  .color-primary {
    background-color: $white;
    color: $red;
    transition: $time;
  }
  .color-primary:hover {
    background-color: $red;
    color: $white;
  }

  .color-inverse-primary {
    background-color: $red;
    color: $white;
    transition: $time;
  }
  .color-inverse-primary:hover {
    background-color: $white;
    color: $red;
  }
  
</style>
