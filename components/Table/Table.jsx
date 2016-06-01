// TODO - consume the new action, read it in mstp of table, pass down the sort fn action and the
// sorted state through mstp/mdtp, and add the sorting functions to the column definition

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
import Error from '../Error';
import styles from './Table.css';
import FontIcon from 'material-ui/FontIcon';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

const Table = ({ data, columns, loading, error, sortState, sortField, sortClick }) => {
  const totalWidth = columns.reduce((prev, current) => prev + current.width, 0);

  const getWidthStyle = (column, total) => ({ width: `${column / total}%` });

  const isSortField = (sortField, field) => sortField === field;

  const getSortIcon = (sortState, sortField, field) => {
    let sort = 'sort';
    if (isSortField(sortField, field)) {
      if (sortState === 'asc') {
        sort = 'arrow_upward';
      } else if (sortState === 'desc') {
        sort = 'arrow_downward';
      }
    }
    return sort;
  };

  const getTable = () => (
    <MaterialTable selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderColumn
              key={index}
              style={getWidthStyle(column.width, totalWidth)}
            >
              <div
                className={styles.headerCell}
                onClick={() => sortClick(column.field, isSortField(sortField, column.field) ? sortState : '', column.sortFn)}
              >
                <Text size={16}>{column.displayName}</Text>
                <FontIcon
                  style={{ fontSize: 16 }}
                  className="material-icons"
                >
                  {getSortIcon(sortState, sortField, column.field)}
                </FontIcon>
              </div>
            </TableHeaderColumn>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} selectable={false}>
        {data.map((match, index) => (
          <TableRow key={index} className={styles[`row${index % 2}`]}>
            {columns.map((column, indexCol) => (
              <TableRowColumn
                key={indexCol}
                style={getWidthStyle(column.width, totalWidth)}
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
      {loading && <Spinner />}
      {!loading && error && <Error />}
      {!loading && !error && getTable()}
    </div>
  );
};

export default Table;
