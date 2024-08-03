<script>
  import Info from "../assets/icons/Info.vue";

  export default {
    components: { Info },

    props: {
      tooltipContent: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        displayTooltip: false,
      };
    },
    computed: {},
    methods: {
      showTooltip() {
        this.displayTooltip = true;
      },

      hideTooltip() {
        this.displayTooltip = false;
      },
    },
  };
</script>
<template>
  <div class="p-relative">
    <span @mouseover="showTooltip" @mouseleave="hideTooltip">
      <Info class="cursor-pointer" :color="'var(--neutral-500)'" />
    </span>

    <div class="info-container d-flex align-items-center">
      <div
        v-if="displayTooltip"
        class="tooltip-container bg-neutral-600 radius-8 p-9 d-flex"
        @close="hideTooltip"
      >
        <p class="p-base-light text-base-white">
          {{ tooltipContent }}
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="sass">
.info-container
  position: absolute
.tooltip-container
  height: auto
  width: max-content
  max-width: 200px
  position: absolute
  right: 0
  top: -25px
  z-index: 1
  [dir=rtl] &
    left: 0px
    right: 15px
</style>
