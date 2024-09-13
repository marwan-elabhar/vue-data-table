export function useCellPathValue({cell, record}) {
    if (!cell.valuePath) return record[cell.id]

    const path = cell.valuePath.split(".");

    let currentValue = record;

    for (const key of path) {
      if (currentValue[key] === null || currentValue[key] === undefined) return null;
      currentValue = currentValue[key];
    }

    return currentValue;

}