<script>
import { formatNumber } from "../../utils";

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
    isValidNumber() {
      return typeof +this.record[this.cell.id] === "number";
    },
  },
  methods: {
    formatValue() {
      return formatNumber({
        number: this.record[this.cell.id],
      })
    }
  }
};
</script>
<template>
  <span v-if="isValidNumber" class="p-base-medium text-neutral-700"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']" @click="entityClicked($event)">{{ formatValue()
    }}%</span>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
