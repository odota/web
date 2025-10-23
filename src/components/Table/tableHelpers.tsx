import React from 'react';
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward';
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward';

const getTotalWidth = (columns: any[]) =>
  columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column: number, total: number) => column / total;

const isSortField = (sortField: string, field: string) => sortField === field;

const getSortIcon = (sortState: string, sortField: string, field: string, style: React.CSSProperties) => {
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

export { getTotalWidth, getWidthStyle, isSortField, getSortIcon };
