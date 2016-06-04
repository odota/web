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

const Table = ({ data, columns, loading, error, sortState, sortField, sortClick }) => {
  const totalWidth = getTotalWidth(columns);

  const getTable = () => (
    <div className={styles.innerContainer}>
      <MaterialTable selectable={false}>
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
          {data.map((match, index) => (
            <TableRow
              key={index}
              match={match}
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
      {!loading && !error && getTable()}
    </div>
  );
};

export default Table;
