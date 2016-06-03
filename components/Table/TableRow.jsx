import React from 'react';
import { TableRow as MaterialTableRow } from 'material-ui/Table';
import TableRowColumn from './TableRowColumn';
import styles from './Table.css';

export default ({ match, columns, totalWidth, index }) => (
  <MaterialTableRow className={styles[`row${index % 2}`]}>
    {columns.map((column, colIndex) => (
      <TableRowColumn key={colIndex} match={match} column={column} totalWidth={totalWidth} />
    ))}
  </MaterialTableRow>
);
