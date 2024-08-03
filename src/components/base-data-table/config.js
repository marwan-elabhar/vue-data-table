const defaultOptions = {
  showHeader: true,
  hasCheckbox: false, // Used to show the row checkbox
  canSelectAllRecords: false, // Used to show the header checkbox
  isCollapsable: false, // Used to enable having custom content under each row
  showActionGroupAlert: false, // hasCheckbox has to be true in order for this to work
  isFirstColumnFixed: false,
  isLastColumnFixed: false,
  defaultCellMinWidth: "100px",
  translationObject: "labels", // temp
}

const cellTypes = {
  // Expected value: String
  string: async () => importComponent({ componentName: "String" }),
  // Expected value: String. Temporary solution for cell translation.
  label: async () => importComponent({ componentName: "Label" }),
  // Expected value: String
  date: async () => importComponent({ componentName: "Date" }),
  // Expected value: String
  email: async () => importComponent({ componentName: "Email" }),
  // Expected value: String
  image: async () => importComponent({ componentName: "Image" }),
  // Expected value: Object. Fields: value (required), countryFlag(optional)
  phoneNumber: async () => importComponent({ componentName: "PhoneNumber" }),
  // Expected value: Array
  list: async () => importComponent({ componentName: "List" }),
  // Expected value: Object. Fields: originalValue (required), currencyRate(required), prefix(optional), suffix(optional)
  currency: async () => importComponent({ componentName: "Currency" }),
  // Expected value: String || Number
  percentage: async () => importComponent({ componentName: "Percentage" }),
  // Expected value: String || Number
  number: async () => importComponent({ componentName: "Number" }),
  component: null,
}

async function importComponent({ componentName }) {
  const module = await import(`./body/cell-types/${componentName}.vue`);

  return module.default;
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
    name: "dataType", // Valid values: (string, label, date, email, image, phoneNumber, list, currency, percentage, number, component)
    type: "string",
    required: true,
  },
  {
    name: "isPrimary",
    type: "boolean",
    required: false,
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
    // To be set to true if the value is needed to be converted to the current currency or false if not. Default: true
    name: "convertCurrency",
    type: "boolean",
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
    name: "customDateFormat",
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
