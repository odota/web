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

const Table = ({ data, columns, loading, error, constantsLoading, constantsError }) => {
  const totalWidth = columns.reduce((prev, current) => prev + current.width, 0);

  const getWidthStyle = (column, total) => ({ width: `${column / total}%` });

  const getTable = () => (
    <MaterialTable selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
        <TableRow>
          {columns.map((column, index) => (
            <TableHeaderColumn
              key={index}
              style={getWidthStyle(column.width, totalWidth)}
            >
              <div className={styles.headerCell}>
                <Text>{column.displayName}</Text>
                <FontIcon
                  style={{ fontSize: 12 }}
                  className="material-icons"
                >
                  arrow_downwards
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
      {loading || constantsLoading && <Spinner />}
      {!loading || !constantsLoading && error || constantsError && <Error />}
      {!loading && !constantsLoading && !error && !constantsError && getTable()}
    </div>
  );
};

export default Table;
