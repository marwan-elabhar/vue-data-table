<script>
  import mixin from "./mixin";

  export default {
    mixins: [mixin],

    data() {
      return {};
    },

    computed: {
      isValidNumber() {
        return typeof +this.record[this.cell.id] === "number";
      },
    },
  };
</script>
<template>
  <span
    v-if="isValidNumber"
    class="p-base-medium text-neutral-700"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
    @click="entityClicked($event)"
  >{{
    $root.formatNumber({
      number: record[cell.id],
    })
  }}%</span>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
