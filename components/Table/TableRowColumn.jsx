import React from 'react';
import { TableRowColumn as MaterialTableRowColumn } from 'material-ui/Table';
import { getWidthStyle } from './tableHelpers';

export default ({ row, column, totalWidth }) => (
  <MaterialTableRowColumn style={getWidthStyle(column.width, totalWidth)}>
    {row && column.dispFn && column.dispFn(row, column, row[column.field])}
    {row && row[column.field] && !column.dispFn && (row[column.field].display || row[column.field])}
  </MaterialTableRowColumn>
);
