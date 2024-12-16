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
    formatDate(value) {
      if (this.cell.dateFormatter) {
        return this.cell.dateFormatter(value);
      }
      if (
        !this.cell.customDateFormat
        && !this.cell.dateLocale
        && !this.cell.dateOptions
      ) {
        return this.getDefaultDateFormat(value);
      }

      const date = new Date(value);

      const formatter = new Intl.DateTimeFormat(
        this.cell.dateLocale || "default",
        this.cell.dateOptions,
      );

      return formatter.format(date);
    },
    getDefaultDateFormat(value) {
      return new Date(value).toISOString().split('T')[0];
    },
  },
};
</script>
<template>
  <span v-if="cellValue" class="p-base-medium string-content-container"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']" @click="entityClicked($event)">{{
      formatDate(cellValue) }}</span>
  <span v-else>---</span>
</template>
