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
  }
};
</script>
<template>
  <span v-if="cellValue" class="p-base-medium string-content-container"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']" @click="entityClicked($event)">{{ cellValue
    }}</span>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
