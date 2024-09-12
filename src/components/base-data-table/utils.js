function formatNumber({
  number,
  style = "decimal",
  currency = "USD", // only required when the style is currency
  locale = "en-US",
  notation = "standard",
  minDecimals = 0,
  maxDecimals = 2,
}) {
  return new Intl.NumberFormat(locale, {
    style,
    currencyDisplay: "narrowSymbol",
    notation,
    currency,
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  }).format(number)
}

export {
  getCellWidth,
  getCellMinWidth,
  formatNumber
}
