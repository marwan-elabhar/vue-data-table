<script>
import Tooltip from "../../components/Tooltip.vue";
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
    currencyCode() {
      return this.$store.state.User.user.settings.currency.code;
    },
    isValidNumber() {
      return typeof +this.cellValue === "number";
    },
    showNumberTooltip() {
      return (
        (this.cell.notation === "compact" || !this.cell.notation)
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
    getCellValue({ notation }) {
      return this.$root.formatNumber({
        number:
          this.cell.convertCurrency || !("convertCurrency" in this.cell)
            ? this.$root.convertCurrencyRate({
              value: this.cellValue,
            })
            : this.cellValue,
        currency:
          this.cell.convertCurrency || !("convertCurrency" in this.cell)
            ? this.currencyCode
            : "USD",
        notation,
        style: "currency",
      });
    },
  },
};
</script>
<template>
  <div class="w-100 d-flex align-items-center p-base-medium p-relative text-neutral-700">
    <span v-if="isValidNumber" :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
      @click="entityClicked($event)">{{ getCellValue({ notation: cell.notation || "compact" }) }}</span>
    <span v-else>---</span>
    <Tooltip v-if="showNumberTooltip" class="m-x-3 m-t-3" :tooltip-content="getCellValue({ notation: 'standard' })" />
  </div>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
