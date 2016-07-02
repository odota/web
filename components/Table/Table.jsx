// TODO - consume the new action, read it in mstp of table, pass down the sort fn action and the
// sorted state through mstp/mdtp, and add the sorting functions to the column definition

import React from 'react';
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
} from 'material-ui/Table';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './Table.css';
import TableRow from './TableRow';
import { getTotalWidth } from './tableHelpers';

const Table = ({ data, columns, loading, error, sortState, sortField, sortClick, numRows }) => {
  const totalWidth = getTotalWidth(columns);
  let modifiedData = data;
  if (numRows) {
    modifiedData = data.slice(0, numRows);
  }

  const getTable = () => (
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
          {modifiedData.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
              totalWidth={totalWidth}
              index={index}
            />
          ))}
        </MaterialTableBody>
      </MaterialTable>
    </div>
  );

  return (
    <div className={styles.container}>
      {loading && <Spinner />}
      {!loading && error && <Error />}
      {!loading && !error && data && getTable()}
    </div>
  );
};

export default Table;
