import React from 'react';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import {
  getWidthStyle,
  getSortIcon,
} from './tableHelpers';
import styles from './Table.css';

export default ({ column, sortClick, sortField, sortState, totalWidth }) => (
  <MaterialTableHeaderColumn
    style={{ width: `${getWidthStyle(column.width, totalWidth)}%` }}
  >
    <div
      className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
      onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
    >
      <div>
        {column.displayName}
        {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
      </div>
    </div>
  </MaterialTableHeaderColumn>
);
