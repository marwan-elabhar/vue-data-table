export default {
  props: {
    cell: {
      required: true,
      type: Object,
    },
    record: {
      required: true,
      type: Object,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  methods: {
    entityClicked({ event }) {
      if (!this.cell.isClickable) return;
      this.$emit("entity-clicked", {
        event,
        actionId: this.cell.actionId,
      });
    },
  },
}
