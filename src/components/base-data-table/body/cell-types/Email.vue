<script>

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
  methods: {
    entityClicked({ event }) {
      if (!this.cell.isClickable) return;
      this.$emit("entity-clicked", {
        event,
        actionId: this.cell.actionId,
      });
    },
  },
};
</script>
<template>
  <a v-if="record[cell.id]" :href="`mailto:${record[cell.id]}`"
    class="p-base-medium cursor-pointer clickable-cell string-content-container" @click="entityClicked($event)">
    {{ record[cell.id] }}
  </a>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
a
  text-decoration: none
  color: inherit
</style>
