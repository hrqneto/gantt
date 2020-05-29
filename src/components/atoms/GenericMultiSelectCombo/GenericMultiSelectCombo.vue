<template>
  <el-select
    v-model="selected"
    placeholder="Select"
    @change="sendValue(selected)"
    multiple
    collapse-tags>
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'generic-multi-select-combo',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      selected: []
    }
  },

  methods: {
    sendValue (selected) {
      this.$emit('selected', selected)
    }
  },

  created () {
    this.sendValue(this.selected)
  }
}
</script>

<style>

</style>
