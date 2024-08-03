import { defaultOptions } from "./config"

function getCellWidth(cells, cell) {
  if (cell.fixedWidth) {
    return `${cell.fixedWidth}px`
  }
  const definedWidths = cells.filter((el) => el.fixedWidth || el.minWidth);
  const definedWidthsSum = definedWidths.reduce((prev, el) => prev + (el.fixedWidth || el.minWidth), 0);
  const remainingCells = cells.length - definedWidths.length;
  return `calc((100% - ${definedWidthsSum}px)${remainingCells > 0 ? `/ ${remainingCells}` : ""})`;
}

function getCellMinWidth(cell) {
  if (cell.minWidth) {
    return `${cell.minWidth}px`
  }
  return defaultOptions.defaultCellMinWidth
}

export {
  getCellWidth,
  getCellMinWidth,
}
