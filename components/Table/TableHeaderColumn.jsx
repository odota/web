import React from 'react';
import {
  getWidthStyle,
  isSortField,
  getSortIcon,
} from './tableHelpers';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import styles from './Table.css';
import FontIcon from 'material-ui/FontIcon';
import { Text } from '../Text';

export default ({ column, sortClick, sortField, sortState, totalWidth }) => (
  <MaterialTableHeaderColumn
    style={getWidthStyle(column.width, totalWidth)}
  >
    <div
      className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
      onClick={() => column.sortFn && sortClick(column.field, isSortField(sortField, column.field) ? sortState : '', column.sortFn)}
    >
      <Text size={16}>{column.displayName}</Text>
      {column.sortFn && (
        <FontIcon style={{ fontSize: 16 }} className="material-icons">
          {getSortIcon(sortState, sortField, column.field)}
        </FontIcon>
      )}
    </div>
  </MaterialTableHeaderColumn>
);
