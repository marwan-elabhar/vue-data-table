<script>
import { defineAsyncComponent } from "vue";
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
    /* actions: Array of objects, object format: {id: String, component: Instance of a component} */
    actions: {
      type: Array,
      required: false,
      default: () => [],
      validator: (actions) => {
        let valid = true;
        actions.forEach((action) => {
          const actionKeys = Object.keys(action);
          if (!actionKeys.includes("id") || !actionKeys.includes("component")) {
            valid = false;
            console.error(`The id and component keys are required`);
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
      return this.content.length === this.selectedRows.length;
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
  },

  mounted() {
    window.addEventListener("resize", this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },

    entityClicked({ event, entity }) {
      this.$emit("entity-clicked", {
        event,
        entity,
      });
    },

    deselectAll() {
      this.selectedRows = [];
      this.$emit("update-selected-rows", { selectedRows: this.selectedRows });
    },

    toggleSelectAll() {
      if (this.selectedRows.length !== this.content.length) {
        this.selectedRows = this.content.map((el) => el.id);
      } else {
        this.selectedRows = [];
      }
      this.$emit("update-selected-rows", { selectedRows: this.selectedRows });
    },

    updateCheckedRows({ value }) {
      if (this.selectedRows.includes(value)) {
        this.selectedRows = this.selectedRows.filter((el) => el !== value);
      } else {
        this.selectedRows = [...this.selectedRows, value];
      }
      this.$emit("update-selected-rows", { selectedRows: this.selectedRows });
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
  <div class="w-100">
    <slot v-if="isLoading" name="loading-state">
      <Loading />
    </slot>
    <slot v-else-if="!content.length" name="empty-state">
      <Empty :message="emptyStateMsg" />
    </slot>

    <div v-else class="w-100 radius-8 bg-base-white overflow-x-auto primary-scroll hidden-scroll table-container">
      <Header v-if="mergedOptions.showHeader" :cells="sortedCells" :is-mobile-view="isMobileView"
        :is-select-all-checked="isSelectAllChecked" :options="mergedOptions" :sort-direction="sortDirection"
        :sort-metric="sortMetric" @update-checkbox="toggleSelectAll" @update-sort="updateSort">
        <template #select-all-checkbox>
          <slot name="select-all-checkbox" />
        </template>
      </Header>

      <Body :cells="sortedCells" :content="content" :is-mobile-view="isMobileView" :options="mergedOptions"
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
    <slot v-if="options.showActionGroupAlert" name="bulk-actions-alert">
      <transition name="fadeUp">
        <ActionsGroupAlert v-if="selectedRows.length > 1 && actions.length" :actions="actions"
          :selected-rows="selectedRows" @deselect-all="deselectAll" />
      </transition>
    </slot>
  </div>
</template>
<style lang="sass" scoped>
.table-container
  border: 1px solid var(--neutral-200)
</style>
