const getTotalWidth = (columns) => columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column, total) => ({ width: `${column / total}%` });

const isSortField = (sortField, field) => sortField === field;

const getSortIcon = (sortState, sortField, field) => {
  let sort = 'sort';
  if (isSortField(sortField, field)) {
    if (sortState === 'asc') {
      sort = 'arrow_upward';
    } else if (sortState === 'desc') {
      sort = 'arrow_downward';
    }
  }
  return sort;
};

export {
  getTotalWidth,
  getWidthStyle,
  isSortField,
  getSortIcon,
};
