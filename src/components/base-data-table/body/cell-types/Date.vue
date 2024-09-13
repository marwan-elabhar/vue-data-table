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
    getMonthName(monthIndex) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months[monthIndex] || "Invalid month";
    },
    formatDate(value) {
      if (this.cell.customDateFormat) {
        return this.cell.customDateFormat(value);
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
      const date = new Date(value);
      const offset = date.getTimezoneOffset();
      const differenceInMinutes = 60000;
      const localDate = new Date(date.getTime() + offset * differenceInMinutes);
      return `${this.getMonthName(
        localDate.getMonth(),
      )} ${localDate.getDate()}, ${localDate.getFullYear()}`;
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
