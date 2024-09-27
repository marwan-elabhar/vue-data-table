<script>
  import Cell from "./Cell.vue";
  import SelectAllCheckbox from "../components/Checkbox.vue";

  export default {
    components: {
      Cell,
      SelectAllCheckbox,
    },
    props: {
      cells: {
        type: Array,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      isSelectAllChecked: {
        type: Boolean,
        required: false,
        default: false,
      },

      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },

      sortDirection: {
        type: String,
        required: false,
        default: "",
      },
      sortMetric: {
        type: String,
        required: false,
        default: "",
      },
      isMobileView: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {
      displayedCells() {
        return this.isMobileView ? [] : this.cells.slice(1, -1);
      },
      firstCell() {
        return this.cells[0];
      },
      lastCell() {
        return this.cells[this.cells.length - 1];
      },
    },
    methods: {
      updateCheckbox(value) {
        this.$emit("update-checkbox", { value });
      },
      updateSort(value) {
        this.$emit("update-sort", value);
      },
    },
  };
</script>
<template>
  <div class="min-w-100 d-inline-block">
    <div
      class="p-x-18 d-flex align-items-center header-container p-relative w-100"
      :class="[
        !isMobileView && options.isFirstColumnFixed && 'p-l-0',
        !isMobileView && options.isLastColumnFixed && 'p-r-0',
      ]"
    >
      <div class="d-flex align-items-center w-100">
        <!-- First cell -->
        <div
          class="d-flex align-items-center"
          :class="
            !isMobileView &&
              options.isFirstColumnFixed &&
              'fixed-table-cell first-fixed-cell p-l-18'
          "
          :style="{
            width: firstCell.style.width + 'px',
            minWidth: firstCell.style.minWidth + 'px',
            maxWidth: firstCell.style.maxWidth + 'px',
          }"
        >
          <slot v-if="options.canSelectAllRecords">
            <SelectAllCheckbox
              :class="isMobileView && 'p-l-21'"
              :is-checked="isSelectAllChecked"
              :disabled="disabled"
              @update-checkbox="updateCheckbox"
            />
          </slot>
          <Cell
            class="p-x-9 p-y-12"
            :cell="firstCell"
            :options="options"
            :sort-direction="sortDirection"
            :sort-metric="sortMetric"
            :is-mobile-view="isMobileView"
            @update-sort="updateSort"
          />
        </div>
        <!-- Remaining cells -->
        <div
          v-for="cell in displayedCells"
          :key="cell.id"
          class="p-x-9 p-y-12"
          :style="{
            width: cell.style.width + 'px',
            minWidth: cell.style.minWidth + 'px',
            maxWidth: cell.style.maxWidth + 'px',
          }"
        >
          <Cell
            :cell="cell"
            :options="options"
            :sort-direction="sortDirection"
            :sort-metric="sortMetric"
            :is-mobile-view="isMobileView"
            @update-sort="updateSort"
          />
        </div>
        <!-- Last cell -->
        <div
          v-if="!isMobileView"
          class="d-flex align-items-center"
          :class="{
            'fixed-table-cell last-fixed-cell': options.isLastColumnFixed,
          }"
          :style="{
            width: lastCell.style.width + 'px',
            minWidth: lastCell.style.minWidth + 'px',
            maxWidth: lastCell.style.maxWidth + 'px',
          }"
        >
          <Cell
            class="p-x-9 p-y-12"
            :cell="lastCell"
            :options="options"
            :sort-direction="sortDirection"
            :sort-metric="sortMetric"
            :is-mobile-view="isMobileView"
            @update-sort="updateSort"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='sass'>
.header-container
  min-height: 70px
</style>