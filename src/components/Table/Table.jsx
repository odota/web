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
import { TablePercent } from 'components/Visualizations';
import { abbreviateNumber, sum } from 'utility';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import styles from './Table.css';

const getTable = (data, columns, sortState, sortField, sortClick, numRows, summable) => (
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
              const { field, color, center, displayFn, relativeBars } = column;
              const value = row[field];
              const style = {
                // width: `${getWidthStyle(column.width, totalWidth)}%`,
                overflow: `${field === 'kills' ? 'visible' : null}`,
                color,
              };

              if (center) {
                style.textAlign = 'center';
              }
              if (!row) {
                return (
                  <MaterialTableRowColumn
                    key={`${index}_${colIndex}`}
                    style={style}
                  />
                );
              }

              let fieldEl = null;
              if (relativeBars) {
                const {
                  type,
                  getDivisor,
                  getAltValue,
                } = relativeBars;

                let divisor = 1;
                if (getDivisor) {
                  divisor = getDivisor(row);
                } else if (type === 'max') {
                  // TODO masad-frost memoize or something
                  divisor = Math.max(...data.map(row => Number(row[column.field])));
                } else if (type === 'total') {
                  divisor = data.reduce((sum, row) => sum + row[column.field], 0);
                }

                const relativeValue = (Number(value) > 0 && divisor !== 0)
                  ? Number((value * 100 / divisor).toFixed(2))
                  : 0;


                fieldEl = (<TablePercent
                  valEl={displayFn && displayFn(row, column, value, index, relativeValue)}
                  val={relativeValue}
                  altValue={getAltValue && getAltValue(row)}
                />);
              } else if (displayFn) {
                fieldEl = displayFn(row, column, value, index);
              } else {
                fieldEl = value;
              }

              return (
                <MaterialTableRowColumn key={`${index}_${colIndex}`} style={style}>
                  {fieldEl}
                </MaterialTableRowColumn>
              );
            })}
          </MaterialTableRow>
        ))}
        {summable && <MaterialTableRow>
          {columns.map((column, colIndex) => (<MaterialTableRowColumn key={`${colIndex}_sum`} style={{ color: column.color }}>
            {column.sumFn && abbreviateNumber(data.map(row => row[column.field]).reduce(sum, 0))}
          </MaterialTableRowColumn>))}
        </MaterialTableRow>}
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
  numRows,
  summable,
}) => (
  <div className={styles.container}>
    {loading && <Spinner />}
    {!loading && error && <Error />}
    {!loading && !error && data && getTable(data, columns, sortState, sortField, sortClick, numRows, summable)}
  </div>
);

const {
  arrayOf,
  bool,
  string,
  func,
  number,
  shape,
} = React.PropTypes;

Table.propTypes = {
  data: arrayOf(shape({})),
  columns: arrayOf(shape({})),
  loading: bool,
  error: bool,
  sortState: string,
  sortField: string,
  sortClick: func,
  numRows: number,
  summable: bool,
};

export default Table;
