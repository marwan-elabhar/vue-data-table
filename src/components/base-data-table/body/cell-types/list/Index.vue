<script>
import ListItem from "./ListItem.vue";
import { useCellPathValue } from "../useCellPathValue";


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
    ListItem,
  },
  data() {
    return {};
  },
  computed: {
    cellValue() {
      return useCellPathValue({ cell: this.cell, record: this.record })
    },
  }

};
</script>
<template>
  <div class="w-100 d-flex flex-wrap">
    <span v-if="cellValue && !cellValue.length">---</span>
    <template v-if="cellValue && cellValue.length">
      <ListItem v-for="item in cellValue" :key="item" class="m-6" :content="item" />
    </template>
  </div>
</template>
