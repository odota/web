import React from 'react';
import PropTypes from 'prop-types';
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
              const { field, color, center, displayFn, relativeBars, percentBars, percentBarsWithValue, sortFn } = column;
              const getValue = typeof sortFn === 'function' ? sortFn : null;
              const value = getValue ? getValue(row) : row[field];
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
              const bars = relativeBars || percentBars || percentBarsWithValue;
              if (bars) {
                const altValue = typeof bars === 'function' && percentBarsWithValue ? bars(row) : null;
                let valEl = null;
                let barPercentValue = 0;
                if (relativeBars) {
                  // Relative bars calculates the max for the column
                  // and gets the percentage of value/max
                  // TODO masad-frost memoize or something
                  const min = getColumnMin(data, field, getValue);
                  let max = getColumnMax(data, field, getValue);
                  let valueWithOffset = value;
                  if (!isNaN(min) && min < 0) {
                    // Rescale to cater for columns with negatives
                    max -= min;
                    valueWithOffset -= min;
                  }

                  const isValidNumber = !isNaN(valueWithOffset);
                  barPercentValue = max !== 0 && isValidNumber
                    ? Number((valueWithOffset * 100 / max).toFixed(2))
                    : 0;
                  valEl = displayFn
                    ? displayFn(row, column, value, index, barPercentValue)
                    : <span>{value}</span>;
                } else {
                  // Percent bars assumes that the value is in decimal
                  barPercentValue = Number((value * 100).toFixed(2)) || 0;
                  valEl = displayFn
                    ? displayFn(row, column, value, index, barPercentValue)
                    : <span>{barPercentValue}%</span>;
                }

                fieldEl = (<TablePercent
                  valEl={valEl}
                  percent={barPercentValue}
                  altValue={altValue}
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
} = PropTypes;

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
