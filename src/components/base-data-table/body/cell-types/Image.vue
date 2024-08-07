<script>
import ImageContainer from "../../components/ImageContainer.vue";

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
  components: { ImageContainer },

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
  <ImageContainer v-if="record[cell.id]" width="30" :src="record[cell.id]" @click="entityClicked($event)" />
  <span v-else>---</span>
</template>
