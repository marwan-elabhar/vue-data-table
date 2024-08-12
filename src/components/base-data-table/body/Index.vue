<script>
import DesktopRow from "./row/Desktop.vue"
import MobileRow from "./row/Mobile.vue"

  export default {
    components: {
      DesktopRow,
      MobileRow
    },

    props: {
      cells: {
        type: Array,
        required: true,
      },
      content: {
        type: Array,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      selectedRows: {
        type: Array,
        required: false,
        default: () => [],
      },
      isMobileView: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {};
    },

    methods: {
      isRowChecked(id) {
        return this.selectedRows.includes(id);
      },

      entityClicked(event, entity) {
        this.$emit("entity-clicked", { event, entity });
      },

      updatedCheckedRows(value) {
        this.$emit("update-checked-rows", value);
      },
      fetchCollapsedData({ id }) {
        this.$emit("fetch-collapsed-data", id);
      },
    },
  };
</script>
<template>
  <div v-if="!isMobileView">
    <div v-for="record in content" :key="record.id">
      <DesktopRow
        :record="record"
        :cells="cells"
        :options="options"
        :is-checked="isRowChecked(record.id)"
        @fetch-collapsed-data="fetchCollapsedData"
        @entity-clicked="entityClicked"
        @update-checked-rows="updatedCheckedRows"
      >
        <template #checkbox>
          <slot name="checkbox" />
        </template>
        <template #row-collapsed-data="record">
          <slot name="row-collapsed-data" v-bind="record" />
        </template>
        <template #positioned-content-activator="record">
          <slot name="positioned-content-activator" v-bind="record" />
        </template>
        <template #positioned-content="record">
          <slot name="positioned-content" v-bind="record" />
        </template>
      </DesktopRow>
    </div>
  </div>
  <div v-else>
    <div v-for="record in content" :key="record.id">
      <MobileRow
        :cells="cells"
        :record="record"
        :options="options"
        :is-checked="isRowChecked(record.id)"
        @entity-clicked="entityClicked"
        @update-checked-rows="updatedCheckedRows"
      >
        <template #mobile-collapse-icon>
          <slot name="mobile-collapse-icon" />
        </template>
        <template #checkbox>
          <slot name="checkbox" />
        </template>
      </MobileRow>
    </div>
  </div>
</template>
