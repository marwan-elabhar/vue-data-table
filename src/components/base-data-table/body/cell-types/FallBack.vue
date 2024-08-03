<script>
  import { cellTypes } from "../../config";
  import Info from "../../assets/icons/Info.vue";

  export default {
    components: {
      Info,
    },

    data() {
      return {
        showTooltip: false,
      };
    },

    computed: {
      displayedTypes() {
        return Object.keys(cellTypes).join(", ");
      },
    },

    methods: {},
  };
</script>
<template>
  <div class="d-flex align-items-baseline">
    <p class="p-base-medium">
      {{ invalidCell }}
    </p>
    <div
      class="ml-1 p-relative cursor-pointer"
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <Info />
      <div
        v-if="showTooltip"
        class="bg-neutral-900 p-9 tooltip-position radius-8 p-small-medium text-base-white d-flex flex-wrap"
      >
        <p>
          {{ validTypes }}
        </p>
        <p class="ml-1">
          {{ displayedTypes }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang='sass'>
.tooltip-position
  position: absolute
  width: max-content
  bottom: 31px
</style>
