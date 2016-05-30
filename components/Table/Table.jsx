import React from 'react';
import {
  Table as MaterialTable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Spinner from '../Spinner';
import { Text } from '../Text';
import styles from './Table.css';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const Table = ({ data, columns, loading, error, constantsLoading, constantsError }) => {
  const totalWidth = columns.reduce((prev, current) => prev.width + current.width, 0);

  const getTable = () => (
    <MaterialTable selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderColumn key={index}><Text color="white">{column.displayName}</Text></TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} selectable={false}>
        {data.map((match, index) => (
          <TableRow key={index} className={styles[`row${index % 2}`]}>
            {columns.map((column, indexCol) => (
              <TableRowColumn
                key={indexCol}
                style={{ width: `${column.width / totalWidth}%` }}
              >
                {column.component ? column.component(match[column.field]) : match[column.field]}
              </TableRowColumn>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MaterialTable>
  );

  return (
    <div>
      {loading || constantsLoading && <Spinner />}
      {!loading || !constantsLoading && error || constantsError && <div>Whoops, something went wrong</div>}
      {!loading && !constantsLoading && !error && !constantsError && getTable()}
    </div>
  );
};

export default Table;
