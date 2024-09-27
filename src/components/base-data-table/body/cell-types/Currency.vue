<script>
import Tooltip from "../../components/Tooltip.vue";
import { useCellPathValue } from "./useCellPathValue";
import { formatNumber } from "./utils";

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
  components: { Tooltip },

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
    showNumberTooltip() {
      return (
        (this.cell?.currencyOptions?.notation === "compact" || !this.cell?.currencyOptions?.notation)
        && this.cellValue
        && this.cellValue > 1000
      );
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
    getCellValue({ notation = '' }) {
      if (this.cell.currencyFormatter) {
        return this.cell.currencyFormatter(this.cellValue)
      }
      return formatNumber({
        number: this.cellValue,
        style: 'currency',
        currency: this.cell?.currencyOptions?.code || 'USD',
        locale: this.cell?.currencyOptions?.locale || "en-US",
        notation: notation || this.cell?.currencyOptions?.notation || 'compact',
        minDecimals: this.cell?.currencyOptions?.minDecimals || 0,
        maxDecimals: this.cell?.currencyOptions?.maxDecimals || 2
      })
    },
  },
};
</script>
<template>
  <div class="w-100 d-flex align-items-center p-base-medium p-relative text-neutral-700">
    <span v-if="isValidNumber" :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
      @click="entityClicked($event)">{{ getCellValue({}) }}</span>
    <span v-else>---</span>
    <Tooltip v-if="showNumberTooltip" class="m-x-3 m-t-3" :tooltip-content="getCellValue({ notation: 'standard' })" />
  </div>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
