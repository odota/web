import React from 'react';
import { TableRowColumn as MaterialTableRowColumn } from 'material-ui/Table';
import { getWidthStyle } from './tableHelpers';

export default ({ match, column, totalWidth }) => (
  <MaterialTableRowColumn style={getWidthStyle(column.width, totalWidth)}>
    {column.component ? column.component(match[column.field].display) : match[column.field].display}
  </MaterialTableRowColumn>
);
