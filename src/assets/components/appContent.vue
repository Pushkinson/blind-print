<template>
    <span
      :class="{
        ['red']: this.symbolItem.isColored,
        ['symbol']: true,
      }"
    >
      {{ this.symbolItem.value }}
    </span>
</template>

<script>
export default {
  name: 'appContent',

  data() {
    return {
      item: this.symbolItem,
    };
  },

  props: {
    symbolItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
}
</script>

<style lang="sass" scoped>
.symbol
  font-size: 30px
  min-width: 5px
.red
  background-color: red
</style>