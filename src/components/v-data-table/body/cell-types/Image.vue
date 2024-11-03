<script>
import ImageContainer from "../../components/ImageContainer.vue";
import { useCellPathValue } from "./useCellPathValue";


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
  computed: {
    cellValue() {
      return useCellPathValue({ cell: this.cell, record: this.record })
    },
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
  <ImageContainer v-if="cellValue" width="30" :src="cellValue" @click="entityClicked($event)" />
  <span v-else>---</span>
</template>
