<script>
  export default {
    props: {
      actions: {
        type: Array,
        required: true,
      },

      selectedRowsLength: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      entityClicked(event, action) {
        this.$emit("entity-clicked", {
          event,
          entity: { actionId: action },
        });
      },

      deselectAll() {
        this.$emit("deselect-all");
      },
    },
  };
</script>
<template>
  <div
    class="shadow-7 p-y-24 p-x-42 alert-container d-flex align-items-center justify-content-between"
  >
    <div class="d-flex align-items-center">
      <span class="p-small-medium text-base-white m-r-6">{{
        selectedRowsLength
      }}</span>
      <span class="p-small-medium selected-label">
      Selected
      </span>

      <button
        name="deselect"
        class="btn-md radius-6 p-x-12 p-y-8 text-primary-500 deselect-btn m-l-15 cursor-pointer"
        @click="deselectAll"
      >
        <span>Deselect All</span>
      </button>
    </div>

    <div class="d-flex align-items-center">
      <span
        v-for="action in actions"
        :key="action.id"
        class="cursor-pointer bg-base-white text-primary-500 radius-4 btn-md radius-6 p-x-12 p-y-8 m-x-12"
        @click="entityClicked($event, action.id)"
      >
        <component
          :is="action.icon" v-if="action.icon"
          class="m-r-3"
        />
        <span class="p-small-medium radius-6 action-name">{{
          action.id
        }}</span>
      </span>
    </div>
  </div>
</template>
<style lang='sass'>
.alert-container
  width: 80%
  background: var(--primary-500)
  position: fixed
  bottom: 20px
  height: 66px
  border-radius: 40px
  margin: 0 5%
  @media (max-width: 576px)
    width: 90%
    margin: 0 !important
  button
    border: none !important
    outline: none !important
  .selected-label
    color: var(--primary-100)
  .deselect-btn
    background: var(--primary-100)

  .action-name
    position: absolute
    bottom: 60px
    padding: 5px
    min-width: max-content
    max-width: 300px
    background-color: var(--neutral-600)
    display: flex
    flex-wrap: wrap
    z-index: 2
    opacity: 0
    visibility: hidden
    transition: all 0.1s ease-in-out
    color: var(--base-white)
    [dir=rtl] &
      right: auto
      left: 0
</style>
