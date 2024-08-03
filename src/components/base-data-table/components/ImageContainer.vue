<script>
  export default {
    props: {
      src: {
        type: String,
        required: false,
        default: "",
      },

      alt: {
        type: String,
        required: false,
        default: "",
      },

      width: {
        type: String,
        required: false,
        default: "auto",
      },
      height: {
        type: String,
        required: false,
        default: "auto",
      },
    },
  };
</script>

<template>
  <img
    :src="src || ''"
    :alt="alt"
    :onerror="`this.onerror=null;this.src='${require('../assets/images/any-missing-icon.svg')}';`"
    :width="width"
    :height="width"
  >
</template>
