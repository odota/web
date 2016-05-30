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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Text } from '../Text';
import styles from './Table.css';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const Table = ({ matches, columns, loading, error }) => {
  const totalWidth = columns.reduce((prev, current) => prev.width + current.width, 0);

  const getTable = () => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <MaterialTable selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeaderColumn key={index}><Text color="white">{column.displayName}</Text></TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} selectable={false}>
          {matches.map((match, index) => (
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
    </MuiThemeProvider>
  );

  return (
    <div>
      {loading && <Spinner />}
      {!loading && error && <div>Whoops, something went wrong</div>}
      {!loading && !error && getTable()}
    </div>
  );
};

export default Table;
