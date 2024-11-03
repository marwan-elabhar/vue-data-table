<script>
import Tooltip from "../../components/Tooltip.vue";
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
        (this.cell?.numberOptions?.notation === "compact" || !this.cell?.numberOptions?.notation)
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
    formatValue({ notation = '' }) {
      if (this.cell.numberFormatter) {
        return this.cell.numberFormatter(this.cellValue)
      }
      return formatNumber({
        number: this.cellValue,
        notation: notation || this.cell?.numberOptions?.notation || 'compact',
        minDecimals: this.cell?.currencyOptions?.minDecimals || 0,
        maxDecimals: this.cell?.currencyOptions?.maxDecimals || 2
      })
    }
  }
};
</script>
<template>
  <div class="w-100 d-flex align-items-center p-base-medium text-neutral-700">
    <span v-if="isValidNumber" :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
      @click="entityClicked($event)">{{ formatValue({})

      }}</span>
    <span v-else>---</span>
    <Tooltip v-if="showNumberTooltip" class="m-x-3 m-t-3" :tooltip-content="formatValue({ notation: 'standard' })" />
  </div>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
