import VDataTable from '@/components/v-data-table/Index.vue';

const VDataTablePlugin = {
  install(app) {
    app.component('VDataTable', VDataTable); 
  }
};

export { VDataTable };
export default VDataTablePlugin;
