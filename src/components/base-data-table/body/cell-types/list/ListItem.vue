<script>
  export default {
    props: {
      content: {
        type: String,
        required: true,
      },
    },
    data() {
      return {};
    },
  };
</script>
<template>
  <p class="p-6 font-primary bg-neutral-200 p-base-light fs-12 radius-10">
    {{ content }}
  </p>
</template>
