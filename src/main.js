import VDataTable from '@/components/v-data-table/Index.vue';
import "@/components/v-data-table/assets/sass/main.sass"

const VDataTablePlugin = {
  install(app) {
    app.component('VDataTable', VDataTable); 
  }
};

export { VDataTable };
export default VDataTablePlugin;
