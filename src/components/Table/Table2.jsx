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
      data: this.props.data,
      sortState: undefined,
    });
  }
  render() {
    const {
      data,
      columns,
      // pageLength,
    } = this.props;
    const {
      sortState,
      sortField,
      // pageNum,
    } = this.state || {};
    return (<div className={styles.innerContainer}>
      <MaterialTable fixedHeader={false} style={{ tableLayout: 'auto' }} selectable={false} className={styles.table}>
        <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
          <TableHeader
            columns={columns}
            sortState={sortState}
            sortField={sortField}
            sortClick={(field, sortState, sortFn) => this.setState(Object.assign({}, {
              data: defaultSort(data, sortState, field, sortFn),
              sortState: this.state.sortState ? SORT_ENUM.next(SORT_ENUM[this.state.sortState]) : SORT_ENUM[0],
            }))}
            // totalWidth={totalWidth}
          />
        </MaterialTableHeader>
        <MaterialTableBody displayRowCheckbox={false} selectable={false}>
          {data.map((row, index) => (
            <MaterialTableRow
              key={index}
              className={styles.row}
            >
              {columns.map((column, colIndex) => {
                const MaterialTableRowColumnStyle = {
                  // width: `${getWidthStyle(column.width, totalWidth)}%`,
                  overflow: `${column.field === 'kills' ? 'visible' : null}`,
                };
                return (
                  <MaterialTableRowColumn key={colIndex} style={MaterialTableRowColumnStyle}>
                    {row && column.displayFn && column.displayFn(row, column, row[column.field])}
                    {row && !column.displayFn && row[column.field]}
                  </MaterialTableRowColumn>
                );
              })}
            </MaterialTableRow>
          ))}
        </MaterialTableBody>
      </MaterialTable>
    </div>);
  }
}

export default Table;
