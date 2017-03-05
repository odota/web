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

const getColumnMax = (data, field, getValue) => {
  const valuesArr = data.reduce((arr, row) => {
    const value = getValue ? getValue(row) : row[field];
    const num = Number(value);
    if (isNaN(num)) {
      return arr;
    }
    arr.push(value);
    return arr;
  }, []);
  return Math.max(...valuesArr);
};

const getColumnMin = (data, field, getValue) => {
  const valuesArr = data.reduce((arr, row) => {
    const value = getValue ? getValue(row) : row[field];
    const num = Number(value);
    if (isNaN(num)) {
      return arr;
    }
    arr.push(value);
    return arr;
  }, []);
  return Math.min(...valuesArr);
};

const TableCreator = ({
  data,
  columns,
  sortState,
  sortField,
  sortClick,
  summable,
}) => (
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
              const { field, color, center, displayFn, relativeBars, sortFn } = column;
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
                  getDivisor,
                  getSmallValue,
                } = relativeBars;
                const getValue = typeof sortFn === 'function' ? sortFn : null;
                const value = getValue ? getValue(row) : row[field];

                let divisor = 1;
                let valueWithOffset = Number(value);
                if (getDivisor) {
                  divisor = getDivisor(row);
                } else {
                  // TODO masad-frost memoize or something
                  const offset = getColumnMin(data, field, getValue);
                  divisor = getColumnMax(data, field, getValue);
                  if (!isNaN(offset) && offset < 0) {
                    // Rescale to cater for columns with negatives
                    divisor -= offset;
                    valueWithOffset -= offset;
                  }
                }
                const isValidNumber = !isNaN(valueWithOffset); // same sign
                const relativeValue = divisor !== 0 && isValidNumber
                  ? Number((valueWithOffset * 100 / divisor).toFixed(2))
                  : 0;

                const displayValue = displayFn
                  ? displayFn(row, column, value, index, relativeValue)
                  : <span>{value}</span>;
                const smallValue = getSmallValue && getSmallValue(row);
                fieldEl = (<TablePercent
                  valEl={displayValue}
                  val={relativeValue}
                  smallValue={smallValue}
                />);
              } else if (displayFn) {
                fieldEl = displayFn(row, column, row[field], index);
              } else {
                fieldEl = row[field];
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
  summable,
}) => (
  <div className={styles.container}>
    {loading && <Spinner />}
    {!loading && error && <Error />}
    {!loading && !error && data && TableCreator({
      data,
      columns,
      sortState,
      sortField,
      sortClick,
      summable,
    })}
  </div>
);

const {
  arrayOf,
  bool,
  string,
  func,
  shape,
} = React.PropTypes;

TableCreator.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
  sortState: string,
  sortField: string,
  sortClick: func,
  summable: bool,
};

Table.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
  loading: bool.isRequired,
  error: bool.isRequired,
  sortState: string,
  sortField: string,
  sortClick: func,
  summable: bool,
};

export default Table;
