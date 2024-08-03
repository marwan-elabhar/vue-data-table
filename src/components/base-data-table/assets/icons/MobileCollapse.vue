<script>
  import Plus from "./Plus.vue";
  import Minus from "./Minus.vue";

  export default {
    components: {
      Plus,
      Minus,
    },
    props: {
      isCollapsed: {
        required: true,
        type: Boolean,
      },
    },
    data() {
      return {};
    },
    methods: {},
  };
</script>
<template>
  <div
    class="d-flex align-items-center justify-content-center radius-4 activator-size"
    :class="[isCollapsed ? 'bg-base-white icon-border' : 'bg-neutral-200']"
  >
    <Minus v-if="isCollapsed" />
    <Plus v-else />
  </div>
</template>
<style scoped lang='sass'>
.activator-size
  width: 30px
  height: 30px
  flex-shrink: 0
.icon-border
  border: 1px solid var(--neutral-200)
</style>
