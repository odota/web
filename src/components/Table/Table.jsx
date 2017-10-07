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
import Pagination from 'components/Table/PaginatedTable/Pagination';
import { abbreviateNumber, sum, SORT_ENUM, defaultSort } from 'utility';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import { StyledBody, StyledContainer } from './Styled';

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

const initialState = {
  currentPage: 0,
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

class Table extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.sortClick = this.sortClick.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.resetTableState) {
      this.setState(initialState);
    }
  }
  setCurrentPage(pageNumber) {
    this.setState({
      ...this.state,
      currentPage: pageNumber,
    });
  }
  sortClick(sortField, sortState, sortFn) {
    const state = this.state;
    this.setState({
      ...state,
      sortState: sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
      sortField,
      sortFn,
    });
  }
  nextPage() {
    this.setState({
      ...this.state,
      currentPage: this.state.currentPage + 1,
    });
  }
  prevPage() {
    this.setState({
      ...this.state,
      currentPage: this.state.currentPage - 1,
    });
  }
  render() {
    const {
      columns,
      loading,
      error,
      summable,
      maxRows,
      paginated,
      pageLength = 20,
    } = this.props;
    const {
      sortState, sortField, sortFn, currentPage,
    } = this.state;
    const dataLength = this.props.data.length;
    let data = this.props.data;
    if (maxRows && maxRows <= dataLength) {
      data = data.slice(0, maxRows);
    }
    if (sortField) {
      data = defaultSort(data, sortState, sortField, sortFn);
    }
    if (paginated) {
      data = data.slice(currentPage * pageLength, (currentPage + 1) * pageLength);
    }
    return (
      <StyledBody>
        {paginated && <Pagination
          numPages={Math.ceil(dataLength / pageLength)}
          currentPage={currentPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          setCurrentPage={this.setCurrentPage}
          place="top"
        />}
        <StyledContainer >
          {loading && <Spinner />}
          {!loading && error && <Error />}
          {!loading && !error && data && (<div className="innerContainer">
            <MaterialTable fixedHeader={false} selectable={false}>
              <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableHeader
                  columns={columns}
                  sortState={sortState}
                  sortField={sortField}
                  sortClick={this.sortClick}
                />
              </MaterialTableHeader>
              <MaterialTableBody displayRowCheckbox={false} selectable={false}>
                {data.map((row, index) => (
                  <MaterialTableRow key={index}>
                    {columns.map((column, colIndex) => {
                      const {
                        field, color, center, displayFn, relativeBars, percentBars, percentBarsWithValue, sortFn,
                      } = column;
                      const getValue = typeof sortFn === 'function' ? sortFn : null;
                      const value = getValue ? getValue(row) : row[field];
                      const style = {
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
                    {column.sumFn && (column.field !== 'life_state_dead' ?
                      abbreviateNumber(data.map(row => row[column.field]).reduce(sum, 0))
                      : column.displayFn(null, column, data.map(row => row[column.field]).reduce(sum, 0))
                    )}
                  </MaterialTableRowColumn>))}
                </MaterialTableRow>}
              </MaterialTableBody>
            </MaterialTable>
          </div>)}
        </StyledContainer>
        {paginated && <Pagination
          numPages={Math.ceil(dataLength / pageLength)}
          currentPage={currentPage}
          pageLength={pageLength}
          length={dataLength}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          setCurrentPage={this.setCurrentPage}
          place="bot"
        />}
      </StyledBody>
    );
  }
}

const {
  arrayOf,
  bool,
  shape,
  number,
} = PropTypes;

Table.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
  loading: bool,
  error: bool,
  summable: bool,
  maxRows: number,
  paginated: bool,
  pageLength: number,
};

export default Table;
