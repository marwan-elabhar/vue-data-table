<script>
import { defineAsyncComponent } from 'vue'
import Header from "./header/Index.vue";
import Body from "./body/Index.vue";
import Empty from "./states/Empty.vue";
import Loading from "./states/Loading.vue";
import { cellProperties, cellTypes, defaultOptions } from "./config";

export default {
  components: {
    Header,
    Body,
    Empty,
    Loading,
    ActionsGroupAlert: defineAsyncComponent(() => import("./components/ActionsGroupAlert.vue")),
  },
  props: {
    content: {
      type: Array,
      required: false,
      default: () => [],
    },
    cells: {
      type: Array,
      required: true,
      validator: (cells) => {
        let valid = true;

        cells.forEach((cell) => {
          if (!Object.keys(cellTypes).includes(cell.dataType)) {
            valid = false;
            /* eslint-disable */
            console.error(`${cell.dataType} is not a valid cell type`);
            /* eslint-enable */
          }

          cellProperties.forEach((property) => {
            if (
              property.required
              && !Object.keys(cell).includes(property.name)
            ) {
              valid = false;
              /* eslint-disable */
              console.error(`${property.name} is a required cell property`);
              /* eslint-enable */
            }
          });
        });
        return valid;
      },
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    sortDirection: {
      type: String,
      default: "asc",
      required: false,
    },
    sortMetric: {
      type: String,
      default: "",
      required: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    /* actions: Array of objects, object format: {id: 'string' (required), label: 'string' (required),
     icon: Instance of an Icon component (not required)} */
    actions: {
      type: Array,
      required: false,
      default: () => [],
      validator: (actions) => {
        let valid = true;
        actions.forEach((action) => {
          const requiredKey = "id";
          const actionKeys = Object.keys(action);
          if (!actionKeys.includes(requiredKey)) {
            valid = false;
            /* eslint-disable */
            console.error(`The ${requiredKey} key is required`);
            /* eslint-enable */
          }
        });
        return valid;
      },
    },
    emptyStateMsg: {
      type: String,
      required: false,
      default: "No Data",
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      selectedRows: [],
      tableWidth: "",
    };
  },

  computed: {
    mergedOptions() {
      return {
        ...defaultOptions,
        ...this.options,
      };
    },
    isMobileView() {
      return this.windowWidth < 768;
    },
    isSelectAllChecked() {
      return !!((this.enabledContent.length) && (this.enabledContent.length === this.selectedRows.length));
    },
    enabledContent() {
      return this.content.filter((el) => !el.disabled);
    },
    calculatedCellWidth() {
      const definedWidths = this.cells.filter((cell) => cell.fixedWidth);
      const definedWidthsSum = definedWidths.reduce(
        (prev, el) => prev + el.fixedWidth,
        0,
      );
      const remainingCells = this.cells.length - definedWidths.length;
      return (this.tableWidth - definedWidthsSum) / remainingCells;
    },
    sortedCells() {
      const negativeOneOrderedCell = this.cells.find(
        (cell) => cell.order === -1,
      );

      const orderedCells = this.cells
        .filter((cell) => !!cell.order && cell.order !== -1)
        .sort((a, b) => a.order - b.order);

      const unorderedCells = this.cells.filter((cell) => !cell.order);

      if (!negativeOneOrderedCell) return [...orderedCells, ...unorderedCells];
      return [...orderedCells, ...unorderedCells, negativeOneOrderedCell];
    },
    modifiedCells() {
      return this.sortedCells.map((cell) => {
        const modified = cell;
        const style = {
          width: modified.fixedWidth || this.calculatedCellWidth,
          minWidth:
            modified.fixedWidth
            || modified.minWidth
            || this.mergedOptions.defaultCellMinWidth,
          maxWidth: this.getCellMaxWidth(cell),
        };
        return {
          ...modified,
          style,
        };
      });
    },
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
    this.tableWidth = this.$refs.tableContainer.clientWidth;
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.tableWidth = this.$refs.tableContainer.clientWidth;
    },

    getCellMaxWidth(cell) {
      if (cell.fixedWidth) {
        return cell.fixedWidth;
      }

      if (
        this.calculatedCellWidth
        > (cell.minWidth || this.mergedOptions.defaultCellMinWidth)
      ) {
        return this.calculatedCellWidth + 100;
      }

      if (cell.minWidth) {
        return cell.minWidth + 100;
      }

      return this.mergedOptions.defaultCellMinWidth + 100;
    },

    entityClicked({ event, entity, params }) {
      this.$emit("entity-clicked", {
        event,
        entity,
        params,
      });
    },

    deselectAll() {
      this.selectedRows = [];
      this.$emit("update-selected-rows", { selectedRows: [] });
    },

    toggleSelectAll() {
      if (this.selectedRows.length !== this.enabledContent.length) {
        this.selectedRows = this.enabledContent;
      } else {
        this.selectedRows = [];
      }
      this.$emit("update-selected-rows", {
        selectedRows: this.selectedRows.map((el) => el.id),
      });
    },

    updateCheckedRows({ value }) {
      if (this.selectedRows.includes(value)) {
        this.selectedRows = this.selectedRows.filter((el) => el !== value);
      } else {
        this.selectedRows = [...this.selectedRows, value];
      }
      this.$emit("update-selected-rows", {
        selectedRows: this.selectedRows.map((el) => el.id),
      });
    },

    updateSort(value) {
      this.$emit("update-sort", { value });
    },
    fetchCollapsedData(id) {
      this.$emit("fetch-collapsed-data", id);
    },
  },
};
</script>
<template>
  <div ref="tableContainer" class="w-100">
    <slot v-if="isLoading" name="loading-state">
      <Loading />
    </slot>
    <slot v-else-if="!content.length" name="empty-state">
      <Empty :message="emptyStateMsg" />
    </slot>

    <div v-else class="w-100 radius-8 bg-base-white overflow-x-auto primary-scroll hidden-scroll table-container">
      <Header v-if="mergedOptions.showHeader" :cells="modifiedCells" :is-mobile-view="isMobileView && !options.disableMobileView"
        :is-select-all-checked="isSelectAllChecked" :disabled="!enabledContent.length" :options="mergedOptions"
        :sort-direction="sortDirection" :sort-metric="sortMetric" @update-checkbox="toggleSelectAll"
        @update-sort="updateSort">
        <template #select-all-checkbox>
          <slot name="select-all-checkbox" />
        </template>
      </Header>

      <Body :cells="modifiedCells" :content="content" :is-mobile-view="isMobileView && !options.disableMobileView" :options="mergedOptions"
        :selected-rows="selectedRows" @fetch-collapsed-data="fetchCollapsedData" @entity-clicked="entityClicked"
        @update-checked-rows="updateCheckedRows">
        <template #checkbox>
          <slot name="checkbox" />
        </template>
        <template #mobile-collapse-icon>
          <slot name="mobile-collapse-icon" />
        </template>
        <template #row-collapsed-data="record">
          <slot name="row-collapsed-data" v-bind="record" @entity-clicked="entityClicked" />
        </template>
        <template #positioned-content-activator="record">
          <slot name="positioned-content-activator" v-bind="record" />
        </template>
        <template #positioned-content="record">
          <slot name="positioned-content" v-bind="record" />
        </template>
      </Body>
    </div>
    <slot v-if="options.showActionGroupAlert" :deselect-all="deselectAll" name="bulk-actions-alert">
      <transition name="fadeUp">
        <ActionsGroupAlert v-if="selectedRows.length >= 1 && actions.length" :actions="actions"
          :selected-rows="selectedRows" @entity-clicked="entityClicked" @deselect-all="deselectAll"
          @update-checked-rows="updateCheckedRows">
          <template #group-actions-item="{ action, deselectValue, innerEntityClicked }">
            <slot :action="action" :deselect-value="deselectValue" :entity-clicked="innerEntityClicked"
              name="group-actions-item" />
          </template>
        </ActionsGroupAlert>
      </transition>
    </slot>
  </div>
</template>
<style lang="sass">
@import "./assets/sass/main"

.table-container
  border: 1px solid var(--neutral-200)
</style>