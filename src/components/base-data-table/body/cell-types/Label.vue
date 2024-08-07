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
  }
};
</script>
<template>
  <span v-if="record[cell.id]" class="p-base-medium string-content-container"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']" @click="entityClicked($event)">{{ record[cell.id]
    }}</span>
  <span v-else>---</span>
</template>
<style scoped lang='sass'>
.clickable-cell:hover
  color: var(--primary-500)
</style>
