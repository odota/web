// TODO - consume the new action, read it in mstp of table, pass down the sort fn action and the
// sorted state through mstp/mdtp, and add the sorting functions to the column definition

import React from 'react';
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn,
} from 'material-ui/Table';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './Table.css';
import { getTotalWidth, getWidthStyle } from './tableHelpers';

const getTable = (data, columns, sortState, sortField, sortClick) => {
  const totalWidth = getTotalWidth(columns);

  return (
    <div className={styles.innerContainer}>
      <MaterialTable selectable={false} className={styles.table}>
        <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
          <TableHeader
            columns={columns}
            sortState={sortState}
            sortField={sortField}
            sortClick={sortClick}
            totalWidth={totalWidth}
          />
        </MaterialTableHeader>
        <MaterialTableBody displayRowCheckbox={false} selectable={false}>
          {data.map((row, index) => (
            <MaterialTableRow
              key={index}
              className={styles.row}
            >
              {columns.map((column, colIndex) => (
                <MaterialTableRowColumn key={colIndex} style={getWidthStyle(column.width, totalWidth)}>
                  {row && column.displayFn && column.displayFn(row, column, row[column.field])}
                  {row && !column.displayFn && row[column.field]}
                </MaterialTableRowColumn>
              ))}
            </MaterialTableRow>
          ))}
        </MaterialTableBody>
      </MaterialTable>
    </div>
  );
};

const Table = ({ data, columns, loading, error, sortState, sortField, sortClick, numRows }) => (
  <div className={styles.container}>
    {loading && <Spinner />}
    {!loading && error && <Error />}
    {!loading && !error && data && getTable(data, columns, sortState, sortField, sortClick, numRows)}
  </div>
);

const { array, bool, string, func, number } = React.PropTypes;

Table.propTypes = {
  data: array,
  columns: array,
  loading: bool,
  error: bool,
  sortState: string,
  sortField: string,
  sortClick: func,
  numRows: number,
};

export default Table;
