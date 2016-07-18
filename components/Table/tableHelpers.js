import React from 'react';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ContentSort from 'material-ui/svg-icons/content/sort';

const getTotalWidth = (columns) => columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column, total) => ({ width: `${column / total}%` });

const isSortField = (sortField, field) => sortField === field;

const getSortIcon = (sortState, sortField, field) => {
  let sort = <ContentSort />;
  if (isSortField(sortField, field)) {
    if (sortState === 'asc') {
      sort = <NavigationArrowUpward />;
    } else if (sortState === 'desc') {
      sort = <NavigationArrowDownward />;
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
