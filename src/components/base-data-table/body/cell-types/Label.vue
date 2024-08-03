<script>
  import mixin from "./mixin";

  export default {
    mixins: [mixin],
    data() {
      return {};
    },
  };
</script>
<template>
  <span
    v-if="record[cell.id]"
    class="p-base-medium string-content-container"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
    @click="entityClicked($event)"
  >{{ record[cell.id] }}</span>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
