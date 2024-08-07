<script>
import ListItem from "./ListItem.vue";

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
};
</script>
<template>
  <div class="w-100 d-flex flex-wrap">
    <span v-if="record[cell.id] && !record[cell.id].length">---</span>
    <template v-if="record[cell.id] && record[cell.id].length">
      <ListItem v-for="item in record[cell.id]" :key="item" class="m-6" :content="item" />
    </template>
  </div>
</template>
