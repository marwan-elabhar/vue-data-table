<script setup>
import { computed } from "vue"
import BaseDataTable from "./components/base-data-table/Index.vue"
import {cells, content} from "./components/data"

const tableCells = computed(() => cells)
const tableContent = computed(() => content)

</script>

<template>
  <BaseDataTable :cells="tableCells" :content="tableContent" />
</template>

<style scoped>

</style>
