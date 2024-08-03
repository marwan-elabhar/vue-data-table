<script>
  import ImageContainer from "../../components/ImageContainer.vue";
  import mixin from "./mixin";

  export default {
    components: { ImageContainer },
    mixins: [mixin],

    data() {
      return {};
    },
  };
</script>
<template>
  <ImageContainer
    v-if="record[cell.id]"
    width="30"
    :src="record[cell.id]"
    @click="entityClicked($event)"
  />
  <span v-else>---</span>
</template>
