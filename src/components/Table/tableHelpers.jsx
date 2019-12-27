import React from 'react';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

const getTotalWidth = columns => columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column, total) => (column / total);

const isSortField = (sortField, field) => sortField === field;

const getSortIcon = (sortState, sortField, field, style) => {
  if (isSortField(sortField, field)) {
    if (sortState === 'asc') {
      return <NavigationArrowUpward style={style} />;
    }
    if (sortState === 'desc') {
      return <NavigationArrowDownward style={style} />;
    }
  }
  return null;
};

export {
  getTotalWidth,
  getWidthStyle,
  isSortField,
  getSortIcon,
};
