<script>
import MissingContact from "../../assets/icons/MissingContact.vue";
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
  components: {
    MissingContact,
  },
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
  <div v-if="cellValue" :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
    class="p-base-medium d-flex align-items-center gap-3" @click="entityClicked">
    <img v-if="cellValue.countryFlag" :src="cellValue.countryFlag" alt="country-flag" width="20">

    <span>
      {{ cellValue.value || cellValue }}
    </span>
  </div>
  <MissingContact v-else />
</template>
<style lang="sass" scoped>
.clickable-cell:hover
  color: var(--primary-500)
</style>
