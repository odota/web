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
import { abbreviateNumber, SORT_ENUM, defaultSort } from 'utility';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import { StyledBody, StyledContainer } from './Styled';

const getColumnMax = (data, field, getValue) => {
  const valuesArr = data.reduce((arr, row) => {
    const value = getValue ? getValue(row) : row[field];
    const num = Number(value);
    if (Number.isNaN(num)) {
      return arr;
    }
    arr.push(value);
    return arr;
  }, []);
  return Math.max(...valuesArr);
};

const partyStyles = (index, data) => {
  if (data.find(player => player.party_id !== 0)) {
    const teamZero = '#D7E874';
    const teamOne = '#4C5900';
    const teamTwo = '#FF9486';
    const teamThree = '#740D00';
    const baseStyle = '8px solid ';
    switch (data[index].party_id) {
      case 0:
        return baseStyle + teamZero;
      case 1:
        return baseStyle + teamOne;
      case 2:
        return baseStyle + teamTwo;
      case 3:
        return baseStyle + teamThree;
      default:
        break;
    }
  }
  return null;
};

const getColumnMin = (data, field, getValue) => {
  const valuesArr = data.reduce((arr, row) => {
    const value = getValue ? getValue(row) : row[field];
    const num = Number(value);
    if (Number.isNaN(num)) {
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
  static renderSumRow({ columns, data }) {
    return (
      <MaterialTableRow>
        {columns.map((column, colIndex) => {
            let total = 0;
            if (column.sumFn) {
              const sumFn = (typeof column.sumFn === 'function') ? column.sumFn : (acc, row) => (acc + row[column.field]);
              total = data.reduce(sumFn, null);
            }

            return (
              <MaterialTableRowColumn key={`${colIndex}_sum`} style={{ color: column.color }}>
                {column.sumFn && ((column.displaySumFn) ? column.displaySumFn(total) : abbreviateNumber(total))}
              </MaterialTableRowColumn>
            );
          })}
      </MaterialTableRow>
    );
  }
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
    const { state } = this;
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
    let { data } = this.props;
    if (maxRows && maxRows <= dataLength) {
      data = data.slice(0, maxRows);
    }
    if (sortField) {
      data = defaultSort(data.slice(0), sortState, sortField, sortFn);
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
          {!loading && !error && data && (
          <div className="innerContainer">
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
                  <MaterialTableRow style={{ borderLeft: partyStyles(index, this.props.data) }} key={index}>
                    {columns.map((column, colIndex) => {
                      const {
                        field, color, center, displayFn, relativeBars, percentBars,
                        percentBarsWithValue, sortFn, invertBarColor,
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
                          if (!Number.isNaN(Number(min)) && min < 0) {
                            // Rescale to cater for columns with negatives
                            max -= min;
                            valueWithOffset -= min;
                          }

                          const isValidNumber = !Number.isNaN(Number(valueWithOffset));
                          barPercentValue = max !== 0 && isValidNumber
                            ? Number((valueWithOffset * 100 / max).toFixed(1))
                            : 0;
                          valEl = displayFn
                            ? displayFn(row, column, value, index, barPercentValue)
                            : <span>{value}</span>;
                        } else {
                          // Percent bars assumes that the value is in decimal
                          barPercentValue = Number((value * 100).toFixed(1)) || 0;
                          valEl = displayFn
                            ? displayFn(row, column, value, index, barPercentValue)
                            : <span>{barPercentValue}</span>;
                        }

                        fieldEl = (<TablePercent
                          valEl={valEl}
                          percent={barPercentValue}
                          altValue={altValue}
                          inverse={invertBarColor}
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
                {summable && Table.renderSumRow({ columns, data })}
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
