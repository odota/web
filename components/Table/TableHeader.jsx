import React from 'react';
import { TableRow as MaterialTableRow } from 'material-ui/Table';
import TableHeaderColumn from './TableHeaderColumn';
import styles from './Table.css';

const TableHeader = ({ columns, sortState, sortField, sortClick, totalWidth }) => (
  <MaterialTableRow className={styles.headerRow}>
    {columns.map((column, index) => (
      <TableHeaderColumn
        key={index}
        column={column}
        sortClick={sortClick}
        sortField={sortField}
        sortState={sortState}
        totalWidth={totalWidth}
      />
    ))}
  </MaterialTableRow>
);

export default TableHeader;
