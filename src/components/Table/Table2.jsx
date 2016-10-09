/**
 * Testing/sandbox for stateful Table component (storing sort/page state)
 **/
import React from 'react';
import {
  Table as MaterialTable,
  TableBody as MaterialTableBody,
  TableHeader as MaterialTableHeader,
  TableRow as MaterialTableRow,
  TableRowColumn as MaterialTableRowColumn,
} from 'material-ui/Table';
import {
  defaultSort,
  SORT_ENUM,
} from 'utility';
import TableHeader from './TableHeader';
// import Spinner from '../Spinner';
// import Error from '../Error';
import styles from './Table.css';

class Table extends React.Component {
  componentWillMount() {
    this.setState({
      sortState: undefined,
      sortField: undefined,
      sortFn: undefined,
      pageNum: 0,
    });
  }
  render() {
    const {
      data,
      columns,
      pageSize,
    } = this.props;
    const {
      sortState,
      sortField,
      sortFn,
      pageNum,
    } = this.state;
    const pageSizeToUse = pageSize || data.length;
    const dataToRender = sortState || pageNum || pageSize
      ? defaultSort([...data], sortState, sortField, sortFn).slice(pageNum * pageSizeToUse, (pageNum + 1) * pageSizeToUse)
      : [...data];
    return (<div className={styles.innerContainer}>
      <MaterialTable fixedHeader={false} style={{ tableLayout: 'auto' }} selectable={false} className={styles.table}>
        <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
          <TableHeader
            columns={columns}
            sortState={sortState}
            sortField={sortField}
            sortClick={(field, sortState, sortFn) => this.setState(Object.assign({}, {
              sortState: this.state.sortState ? SORT_ENUM.next(SORT_ENUM[this.state.sortState]) : SORT_ENUM[0],
              sortField: field,
              sortFn,
            }))}
          />
        </MaterialTableHeader>
        <MaterialTableBody displayRowCheckbox={false} selectable={false}>
          {dataToRender.map((row, index) => (
            <MaterialTableRow
              key={index}
              className={styles.row}
            >
              {columns.map((column, colIndex) => (
                <MaterialTableRowColumn key={colIndex}>
                  {row && column.displayFn && column.displayFn(row, column, row[column.field])}
                  {row && !column.displayFn && row[column.field]}
                </MaterialTableRowColumn>)
              )}
            </MaterialTableRow>
          ))}
        </MaterialTableBody>
      </MaterialTable>
    </div>);
  }
}

export default Table;
