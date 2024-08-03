<script>
  import MissingContact from "../../assets/icons/MissingContact.vue";
  import mixin from "./mixin";

  export default {
    components: {
      MissingContact,
    },
    mixins: [mixin],
    data() {
      return {};
    },

    methods: {
      entityClicked() {
      },
    },
  };
</script>
<template>
  <div
    v-if="record[cell.id]"
    :class="[cell.isClickable ? 'cursor-pointer clickable-cell' : '']"
    class="p-base-medium d-flex align-items-center gap-3"
    @click="entityClicked"
  >
    <img
      v-if="record[cell.id].countryFlag"
      :src="record[cell.id].countryFlag"
      alt="country-flag"
      width="20"
    >

    <span>
      {{ record[cell.id].value || record[cell.id] }}
    </span>
  </div>
  <MissingContact v-else />
</template>
<style lang="sass" scoped>
.clickable-cell:hover
  color: var(--primary-500)
</style>
