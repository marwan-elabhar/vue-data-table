<script>
  import { cellTypes } from "../../config";
  import MobileCollapseIcon from "../../assets/icons/MobileCollapse.vue";
  import Checkbox from "../../components/Checkbox.vue";
  import { getCellWidth, getCellMinWidth } from "../../utils";

  export default {
    components: {
      FallBackCell: () => import("../cell-types/FallBack.vue"),
      MobileCollapseIcon,
      Checkbox,
    },
    props: {
      cells: {
        required: true,
        type: Array,
      },
      record: {
        required: true,
        type: Object,
      },
      options: {
        type: Object,
        required: true,
      },
      isChecked: {
        required: false,
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        showCollapsedCells: false,
      };
    },
    computed: {
      types() {
        return cellTypes;
      },
      primaryCell() {
        return this.cells.find((cell) => cell.isPrimary) || this.cells[0];
      },
      collapsedRowCells() {
        return this.cells.filter((cell) => !cell.isPrimary);
      },
      rowBGColor() {
        if (this.isChecked) {
          return "var(--neutral-100)";
        }
        return "var(--base-white)";
      },
    },
    methods: {
      entityClicked({ event, actionId }) {
        this.$emit("entity-clicked", event, {
          actionId,
          recordId: this.record.id,
        });
      },
      calculateCellWidth(cell) {
        return getCellWidth(this.cells, cell);
      },

      calculateCellMinWidth(cell) {
        return getCellMinWidth(cell);
      },
      toggleCollapsedCells() {
        this.showCollapsedCells = !this.showCollapsedCells;
      },

      updateCheckedRows(value) {
        this.$emit("update-checked-rows", { value });
      },
    },
  };
</script>
<template>
  <div>
    <div
      class="mobile-row d-flex p-t-12"
      :style="{ backgroundColor: rowBGColor }"
    >
      <div class="d-flex align-items-center m-l-30 m-b-12">
        <slot name="mobile-collapse-icon">
          <MobileCollapseIcon
            class="m-r-12 cursor-pointer"
            :is-collapsed="showCollapsedCells"
            @click="toggleCollapsedCells"
          />
        </slot>
        <slot name="checkbox">
          <Checkbox
            v-if="options.hasCheckbox"
            class="m-r-9"
            :is-checked="isChecked"
            :value="record.id"
            :disabled="
              !record.isSelectable && record.isSelectable !== undefined
            "
            @update-checkbox="updateCheckedRows"
          />
        </slot>
        <div class="d-flex align-items-center w-100">
          <component
            :is="types[primaryCell.dataType] || primaryCell.component"
            v-if="Object.keys(types).includes(primaryCell.dataType)"
            :cell="primaryCell"
            :record="record"
            :options="options"
            @entity-clicked="entityClicked"
          />

          <FallBackCell v-else />
        </div>
      </div>
    </div>
    <transition name="animate-height">
      <div v-if="showCollapsedCells" class="p-18 w-100 collapsed-section">
        <div
          v-for="cell in collapsedRowCells"
          :key="cell.id"
          class="d-flex justify-content-between align-items-center m-b-24"
        >
          <p class="heading-6-light">
            {{ cell.name }}
          </p>
          <div
            class="text-right p-small-bold"
            @click="cell.isClickable && entityClicked($event, cell.actionId)"
          >
            <component
              :is="types[cell.dataType] || cell.component"
              v-if="Object.keys(types).includes(cell.dataType)"
              :cell="cell"
              :record="record"
              :options="options"
              @entity-clicked="entityClicked"
            />
            <FallBackCell v-else />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang='sass'>
.mobile-row
  border-top: 2px solid var(--neutral-200)
  min-height: 70px
.collapsed-section
  max-height: max-content
  background: var(--neutral-100)
</style>
