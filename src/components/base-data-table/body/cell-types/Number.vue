<script>
  import mixin from "./mixin";
  import Tooltip from "../../components/Tooltip.vue";

  export default {
    components: { Tooltip },
    mixins: [mixin],

    data() {
      return {};
    },
    computed: {
      isValidNumber() {
        return typeof +this.cellValue === "number";
      },
      showNumberTooltip() {
        return (
          (this.cell.notation === "compact" || !this.cell.notation)
          && this.record[this.cell.id]
          && this.record[this.cell.id] > 1000
        );
      },
    },
  };
</script>
<template>
  <div class="w-100 d-flex align-items-center p-base-medium text-neutral-700">
    <span
      v-if="isValidNumber"
      :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
      @click="entityClicked($event)"
    >{{
      $root.formatNumber({
        number: record[cell.id],
        notation: cell.notation || "compact",
      })
    }}</span>
    <span v-else>---</span>
    <Tooltip
      v-if="showNumberTooltip"
      class="m-x-3 m-t-3"
      :tooltip-content="
        $root.formatNumber({
          number: record[cell.id],
          notation: 'standard',
        })
      "
    />
  </div>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
