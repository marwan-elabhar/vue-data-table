<script>
  export default {
    props: {
      value: {
        type: [Number, String],
        required: false,
        default: "",
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      isChecked: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {};
    },

    methods: {},
  };
</script>

<template>
  <div class="p-relative m-r-3" :class="[disabled ? 'disabled' : '']">
    <input
      :id="value + '_checkbox'"
      type="checkbox"
      :value="value"
      :class="[disabled ? 'disabled' : '']"
      :disabled="disabled"
      :checked="isChecked"
      @change="$emit('update-checkbox', value)"
    >
    <label
      :class="[disabled ? 'disabled' : 'cursor-pointer']"
      :for="value + '_checkbox'"
    />
  </div>
</template>

<style scoped lang='sass'>
.checkbox-container
  position: relative
input[type="checkbox"]
  opacity: 0
  display: none
label
  position: relative
  top: 2px
  bottom: 0
  right: 0
  left: 0
label::before,
label::after
  content: ""
  display: inline-block
label::before
  height: 16px
  width: 16px
  border: 1px solid var(--primary-500)
  border-radius: 4px
label::after
  height: 16px
  width: 16px
  border-radius: 4px
  text-align: center
  background: var(--primary-500)
  color: var(--base-white)
input[type="checkbox"] + label::after
  content: none
input[type="checkbox"]:checked + label::after
  content: "\2713"
  color: var(--base-white)
  position: absolute
  left: 0
  font-style: italic
  text-align: inherit
</style>
