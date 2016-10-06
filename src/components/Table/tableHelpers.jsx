import React from 'react';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';
import ContentSort from 'material-ui/svg-icons/content/sort';

const getTotalWidth = columns => columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column, total) => (column / total);

const isSortField = (sortField, field) => sortField === field;

const getSortIcon = (sortState, sortField, field, style) => {
  let sort = <ContentSort style={style} />;
  if (isSortField(sortField, field)) {
    if (sortState === 'asc') {
      sort = <NavigationArrowUpward style={style} />;
    } else if (sortState === 'desc') {
      sort = <NavigationArrowDownward style={style} />;
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
