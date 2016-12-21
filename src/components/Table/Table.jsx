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
import {
  // getTotalWidth,
  // getWidthStyle,
} from './tableHelpers';

const getTable = (data, columns, sortState, sortField, sortClick) => (
  // Not currently using totalWidth (default auto width)
  // const totalWidth = getTotalWidth(columns);
  <div className={styles.innerContainer}>
    <MaterialTable fixedHeader={false} selectable={false}>
      <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableHeader
          columns={columns}
          sortState={sortState}
          sortField={sortField}
          sortClick={sortClick}
          // totalWidth={totalWidth}
        />
      </MaterialTableHeader>
      <MaterialTableBody displayRowCheckbox={false} selectable={false}>
        {data.map((row, index) => (
          <MaterialTableRow key={index}>
            {columns.map((column, colIndex) => {
              const style = {
                // width: `${getWidthStyle(column.width, totalWidth)}%`,
                overflow: `${column.field === 'kills' ? 'visible' : null}`,
                color: column.color,
              };

              if (column.center) {
                style.textAlign = 'center';
              }

              return (
                <MaterialTableRowColumn key={colIndex} style={style}>
                  {row && column.displayFn && column.displayFn(row, column, row[column.field], index)}
                  {row && !column.displayFn && row[column.field]}
                </MaterialTableRowColumn>
              );
            })}
          </MaterialTableRow>
        ))}
      </MaterialTableBody>
    </MaterialTable>
  </div>
);

const Table = ({
  data,
  columns,
  loading,
  error,
  sortState,
  sortField,
  sortClick,
}) => (
  <div className={styles.container}>
    {loading && <Spinner />}
    {!loading && error && <Error />}
    {!loading && !error && data && getTable(data, columns, sortState, sortField, sortClick)}
  </div>
);

const {
  arrayOf,
  bool,
  oneOfType,
  string,
  func,
  object,
  shape,
} = React.PropTypes;

Table.propTypes = {
  data: arrayOf(object).isRequired,
  columns: arrayOf(shape({
    displayFn: func,
    sortFn: oneOfType([func, bool]),
    field: string.isRequired,
    tooltip: string,
    displayName: string,
  })).isRequired,
  loading: bool,
  error: bool,
  sortState: string,
  sortField: string,
  sortClick: func,
};

export default Table;
