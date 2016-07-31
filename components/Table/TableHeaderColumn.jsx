import React from 'react';
import {
  getWidthStyle,
  isSortField,
  getSortIcon,
} from './tableHelpers';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import styles from './Table.css';
import { Text } from '../Text';

export default ({ column, sortClick, sortField, sortState, totalWidth }) => (
  <MaterialTableHeaderColumn
    style={getWidthStyle(column.width, totalWidth)}
  >
    <div
      className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
      onClick={() => column.sortFn && sortClick(column.field, isSortField(sortField, column.field) ? sortState : '', column.sortFn)}
    >
      <Text size={14}>{column.displayName}
      {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
      </Text>
    </div>
  </MaterialTableHeaderColumn>
);
