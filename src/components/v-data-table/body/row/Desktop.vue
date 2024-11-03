<script>
import { defineAsyncComponent } from 'vue'
import Checkbox from "../../components/Checkbox.vue";
import ArrowDown from "../../assets/icons/ArrowDown.vue";
import { cellTypes } from "../../config";

export default {
  components: {
    ArrowDown,
    Checkbox,
    FallBackCell: () => defineAsyncComponent(() => import("../cell-types/FallBack.vue")),
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
      isCollapsed: false,
    };
  },
  computed: {
    types() {
      return cellTypes;
    },
    rowBGColor() {
      if (this.isChecked) {
        return "var(--neutral-100)";
      }
      return this.record.isHighlighted
        ? this.options.highlightColor
        : "var(--base-white)";
    },
    displayedCells() {
      return this.cells.slice(1, -1);
    },
    firstCell() {
      return this.cells[0];
    },
    lastCell() {
      return this.cells[this.cells.length - 1];
    },
  },

  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
      if (this.isCollapsed) this.$emit("fetch-collapsed-data", { id: this.record.id });
    },

    entityClicked({ event, actionId, params }) {
      this.$emit(
        "entity-clicked",
        event,
        {
          actionId,
          recordId: this.record.id,
        },
        params,
      );
    },

    updateCheckedRows(value) {
      this.$emit("update-checked-rows", { value });
    },
  },
};
</script>
<template>
  <div class="min-w-100 row-border d-inline-block" :style="{ backgroundColor: rowBGColor }">
    <div class="d-flex align-items-center w-100 row-container">
      <div class="w-100">
        <div class="d-flex w-100 align-items-center p-x-18" :class="[
          options.isFirstColumnFixed && 'p-l-0',
          options.isLastColumnFixed && 'p-r-0',
        ]">
          <!-- First cell -->

          <div class="p-y-15 d-flex align-items-center gap-6" :class="{
            'fixed-table-cell first-fixed-cell p-l-18 p-r-9':
              options.isFirstColumnFixed,
          }" :style="{
              width: firstCell.style.width + 'px',
              minWidth: firstCell.style.minWidth + 'px',
              maxWidth: firstCell.style.maxWidth + 'px',
            }">
            <slot v-if="options.hasCheckbox" name="checkbox">
              <Checkbox :is-checked="isChecked" :value="record.id" :disabled="record.disabled"
                @update-checkbox="updateCheckedRows" />
            </slot>

            <span v-if="options.isCollapsable">
              <ArrowDown :style="{
                transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
              }" color="var(--primary-500)" width="30" height="10" class="arrow-transition cursor-pointer" @click="toggleCollapse" />
            </span>

            <div class="d-flex align-items-center w-100">
              <component :is="types[firstCell.dataType] || firstCell.component"
                v-if="Object.keys(types).includes(firstCell.dataType)" :cell="firstCell" :record="record"
                :options="options" @entity-clicked="entityClicked" />
              <FallBackCell v-else />
            </div>
          </div>

          <!-- Remaining cells -->

          <div v-for="cell in displayedCells" :key="cell.id" class="p-x-9 p-y-12" :style="{
            width: cell.style.width + 'px',
            minWidth: cell.style.minWidth + 'px',
            maxWidth: cell.style.maxWidth + 'px',
          }">
            <div class="d-flex align-items-center w-100">
              <component :is="types[cell.dataType] || cell.component" v-if="Object.keys(types).includes(cell.dataType)"
                :cell="cell" :record="record" :options="options" @entity-clicked="entityClicked" />

              <FallBackCell v-else />
            </div>
          </div>

          <!-- Last cell -->

          <div class="p-y-15 d-flex align-items-center" :class="{
            'fixed-table-cell last-fixed-cell p-l-18 p-r-9':
              options.isLastColumnFixed,
          }" :style="{
              width: lastCell.style.width + 'px',
              minWidth: lastCell.style.minWidth + 'px',
              maxWidth: lastCell.style.maxWidth + 'px',
            }">
            <div class="d-flex align-items-center w-100">
              <template v-if="!lastCell.hasPositionedContent">
                <component :is="types[lastCell.dataType] || lastCell.component"
                  v-if="Object.keys(types).includes(lastCell.dataType)" :cell="lastCell" :record="record"
                  :options="options" @entity-clicked="entityClicked" />
                <FallBackCell v-else />
              </template>

              <template v-else>
                <slot name="positioned-content-activator" :record="record" />
              </template>
            </div>
          </div>

          <slot name="positioned-content" :record="record" />
        </div>

        <div v-if="options.isCollapsable">
          <transition name="animate-height">
            <div v-if="isCollapsed" class="collapsed-section">
              <slot name="row-collapsed-data" :record="record" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='sass'>
.row-border
  border-top: 2px solid var(--neutral-200)
.row-container
  min-height: 70px
.collapsed-section
  max-height: max-content
  background: var(--neutral-100)
.arrow-transition
  transition: transform 0.3s ease  
</style>