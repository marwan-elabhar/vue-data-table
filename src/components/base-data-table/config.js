import { defineAsyncComponent } from 'vue'

const defaultOptions = {
  showHeader: true,
  hasCheckbox: false, // Used to show the row checkbox
  canSelectAllRecords: false, // Used to show the header checkbox
  isCollapsable: false, // Used to enable having custom content under each row
  showActionGroupAlert: false, // hasCheckbox has to be true in order for this to work
  isFirstColumnFixed: false,
  isLastColumnFixed: false,
  defaultCellMinWidth: 100,
}

const cellTypes = {
  // Expected value: String
  string: defineAsyncComponent(() => import("./body/cell-types/String.vue")),
  // Expected value: String
  date: defineAsyncComponent(() => import("./body/cell-types/Date.vue")),
  // Expected value: String
  email: defineAsyncComponent(() => import("./body/cell-types/Email.vue")),
  // Expected value: String
  image: defineAsyncComponent(() => import("./body/cell-types/Image.vue")),
  // Expected value: Array
  list: defineAsyncComponent(() => import("./body/cell-types/list/Index.vue")),
  // Expected value: Object. Fields: originalValue (required), currencyRate(required), prefix(optional), suffix(optional)
  currency: defineAsyncComponent(() => import("./body/cell-types/Currency.vue")),
  // Expected value: String || Number
  percentage: defineAsyncComponent(() => import("./body/cell-types/Percentage.vue")),
  // Expected value: String || Number
  number: defineAsyncComponent(() => import("./body/cell-types/Number.vue")),
  component: null,
}

const cellProperties = [
  {
    name: "id",
    type: "string",
    required: true,
  },
  {
    name: "name",
    type: "string",
    required: true,
  },
  {
    name: "valuePath", // to get the value based on an object path ex(campaign.name)
    type: "string",
    required: false,
  },
  {
    name: "dataType", // Valid values: (string, date, email, image, phoneNumber, list, currency, percentage, number, component)
    type: "string",
    required: true,
  },
  {
    name: "sortKey",
    type: "string",
    required: false,
  },
  {
    name: "sortable",
    type: "boolean",
    required: false,
  },
  {
    name: "fixedWidth",
    type: "number",
    required: false,
  },
  {
    name: "minWidth",
    type: "number",
    required: false,
  },
  {
    name: "isClickable",
    type: "boolean",
    required: false,
  },
  {
    name: "actionId",
    type: "string",
    required: false,
  },
  {
    name: "order", // Optional: set order to be -1 if wanted to be the last cell
    type: "number",
    required: false,
  },
  {
    name: "notation", // Used for number formatting. Default: compact
    type: "string",
    required: false,
  },
  {
    name: "dateLocale", // Expected value: locale string for Intl.DateTimeFormat
    type: "string",
    required: false,
  },
  {
    name: "dateOptions", // Expected value: options object for Intl.DateTimeFormat
    type: "object",
    required: false,
  },
  {
    name: "dateFormatter",
    type: "function",
    required: false,
  },
  {
    name: "hasPositionedContent", // Used in the last cell if last column is fixed and the cell includes positioned content
    type: "boolean",
    required: false,
  },
  {
    name: "component",
    required: false,
  },

]

export {
  defaultOptions,
  cellTypes,
  cellProperties,
}
