<script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
    },
  };
</script>

<template>
  <div
    class="p-x-18 p-y-45 d-flex justify-content-center align-items-center flex-column bg-base-white radius-8"
  >
    <img src="../assets/images/no-data.svg">
    <p class="m-t-15 p-base-medium text-neutral-400">
      {{ message }}
    </p>
  </div>
</template>
