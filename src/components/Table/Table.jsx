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
import querystring from 'querystring';
import { abbreviateNumber, SORT_ENUM, defaultSort } from 'utility';
import Pagination from './PaginatedTable/Pagination';
import TableHeader from './TableHeader';
import Spinner from '../Spinner';
import Error from '../Error';
import { StyledBody, StyledContainer } from './Styled';
import { PAGINATION_PAGE_NUMBER, PAGINATION_PAGE_SIZE } from '../keys';

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

const toUnderline = (data, row, field, underline) => {
  const x = [];
  data.forEach((r) => {
    x.push(r[field]);
  });
  x.sort((a, b) => a - b);
  if ((underline === 'min' && x[0] === row[field]) || ((underline === 'max' && x[x.length - 1] === row[field]))) {
    return true;
  }
  return false;
};

const getParamFromURL = (key) => {
  const params = querystring.decode(window.location.search.substring(1));
  return params[key];
};

const updateURLQueryStringParam = function (key, value) {
  const params = querystring.decode(window.location.search.substring(1));
  params[key] = value;
  const baseUrl = [window.location.protocol, '//', window.location.host, window.location.pathname].join('');
  window.history.replaceState({}, '', [baseUrl, '?', querystring.encode(params)].join(''));
};

const getPageNumberFromURL = () => {
  const page = getParamFromURL(PAGINATION_PAGE_NUMBER);
  return page ? page - 1 : 0;
};

const getPageLengthFromURL = () => {
  const length = getParamFromURL(PAGINATION_PAGE_SIZE);
  return length || 20;
};

const initialState = {
  currentPage: getPageNumberFromURL(),
  pageLength: getPageLengthFromURL(),
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
    // update the URL with page number as the user sees it (1 indexed vs 0 indexed)
    updateURLQueryStringParam('page', pageNumber + 1);
    this.setState({
      ...this.state,
      currentPage: pageNumber,
    });
  }
  nextPage() {
    this.setCurrentPage(this.state.currentPage + 1);
  }
  prevPage() {
    this.setCurrentPage(this.state.currentPage - 1);
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
  render() {
    const {
      columns,
      loading,
      error,
      summable,
      maxRows,
      paginated,
      placeholderMessage,
    } = this.props;
    const {
      sortState, sortField, sortFn, currentPage, pageLength,
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
          {!loading && !error && dataLength <= 0 && <div>{placeholderMessage}</div>}
          {!loading && !error && dataLength > 0 && (
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
                  <MaterialTableRow key={index}>
                    {columns.map((column, colIndex) => {
                      const {
                        field, color, center, displayFn, relativeBars, percentBars,
                        percentBarsWithValue, sortFn, invertBarColor, underline,
                      } = column;
                      const getValue = typeof sortFn === 'function' ? sortFn : null;
                      const value = getValue ? getValue(row) : row[field];
                      const style = {
                        overflow: `${field === 'kills' ? 'visible' : null}`,
                        color,
                        marginBottom: 0,
                        textUnderlinePosition: 'under',
                        textDecorationColor: 'rgb(140, 140, 140)',
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
                      if (underline === 'max' || underline === 'min') {
                        style.textDecoration = toUnderline(data, row, field, underline) ? 'underline' : 'none';
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
  string,
} = PropTypes;

Table.propTypes = {
  data: arrayOf(shape({})).isRequired,
  columns: arrayOf(shape({})).isRequired,
  loading: bool,
  error: bool,
  summable: bool,
  maxRows: number,
  paginated: bool,
  placeholderMessage: string,
};

export default Table;
