import VueTableLite from '@/components/vue-table-lite/Index.vue';

const VueTableLitePlugin = {
  install(app) {
    app.component('VueTableLite', VueTableLite); 
  }
};

export { VueTableLite };
export default VueTableLitePlugin;
