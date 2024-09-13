<script>
import { useCellPathValue } from "./useCellPathValue";


export default {
  props: {
    cell: {
      required: true,
      type: Object,
    },
    record: {
      required: true,
      type: Object,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    cellValue() {
      return useCellPathValue({ cell: this.cell, record: this.record })
    },
  },
  methods: {
    entityClicked({ event }) {
      if (!this.cell.isClickable) return;
      this.$emit("entity-clicked", {
        event,
        actionId: this.cell.actionId,
      });
    },
  },
};
</script>
<template>
  <a v-if="cellValue" :href="`mailto:${cellValue}`"
    class="p-base-medium cursor-pointer clickable-cell string-content-container" @click="entityClicked($event)">
    {{ cellValue }}
  </a>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
a
  text-decoration: none
  color: inherit
</style>
