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
  <a
    v-if="record[cell.id]"
    :href="`mailto:${record[cell.id]}`"
    class="p-base-medium cursor-pointer clickable-cell string-content-container"
    @click="entityClicked($event)"
  >
    {{ record[cell.id] }}
  </a>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
a
  text-decoration: none
  color: inherit
</style>
