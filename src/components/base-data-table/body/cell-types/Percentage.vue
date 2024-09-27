<script>
import { formatNumber } from "./utils";
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
    isValidNumber() {
      return typeof +this.cellValue === "number";
    },
  },
  methods: {
    formatValue() {
      return formatNumber({
        number: this.cellValue,
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
