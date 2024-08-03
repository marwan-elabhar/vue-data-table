<script>
  import ArrowDown from "../assets/icons/ArrowDown.vue";

  export default {
    components: { ArrowDown },
    props: {
      cell: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      sortDirection: {
        type: String,
        default: "",
        required: false,
      },
      sortMetric: {
        type: String,
        default: "",
        required: false,
      },
      isMobileView: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {};
    },

    computed: {
      isSortDirectionChanged() {
        return (
          this.sortDirection === "desc"
          && this.sortMetric === (this.cell?.sortKey || this.cell.id)
        );
      },
    },

    methods: {
      sort() {
        this.$emit("update-sort", this.cell?.sortKey || this.cell.id);
      },
    },
  };
</script>
<template>
  <div class="d-flex align-items-center" :class="[isMobileView && 'm-l-42']">
    <span class="p-small-medium text-neutral-400">
      {{ cell.name }}
    </span>
    <span v-if="cell.suffix" class="m-l-3 p-small-medium text-neutral-400">{{
      cell.suffix
    }}</span>
    <ArrowDown
      v-if="cell.sortable"
      :class="[isSortDirectionChanged && 'transform-180']"
      width="8"
      height="6"
      class="m-l-6 cursor-pointer"
      color="var(--neutral-400)"
      @click="sort"
    />
  </div>
</template>
