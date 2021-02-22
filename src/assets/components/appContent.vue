<template>
    <p class="symbol" :class="{['red']: this.symbolItem.isColored}">{{ this.symbolItem.value }}</p>
</template>

<script>
export default {
    name: 'appContent',

    data() {
      return {
        item: this.symbolItem
      }
    },

  props: {
    symbolItem: {
      type: Object,
      default() {
        return {}
      }
    }
  }

}
</script>

<style lang="sass" scoped>
.symbol
  min-width: 5px
.red
  background-color: red
</style>