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
import { Fixed } from 'utility/components';

const PureRow = Fixed(MaterialTableRow);

class Table extends React.PureComponent {
  render() {
    let {
      data,
      columns,
      sortState,
      sortField,
      sortClick
    } = this.props;

    return (
      <div>
        <div>
          <MaterialTable fixedHeader={false} selectable={false}>
            <MaterialTableHeader displaySelectAll={false} adjustForCheckbox={false} className={styles.header}>
              <TableHeader
                  columns={columns}
                  sortState={sortState}
                  sortField={sortField}
                  sortClick={sortClick}
              />
            </MaterialTableHeader>
            <MaterialTableBody displayRowCheckbox={false} selectable={false}>
              {data.map((row, index) => (
                 <PureRow
                     key={row.key}
                     className={styles.row}
                 >
                   {columns.map((column, colIndex) => {
                      const displayColumn = (column, row) => {
                        if (row && column.displayFn) {
                          if (column.field && column.field in row)
                            return column.displayFn(row, column, row[column.field], index);
                          return column.displayFn(row, column);
                        } else {
                          return row[column.field];
                        }
                      }
                      return (
                        <MaterialTableRowColumn key={colIndex}>
                          {displayColumn(column, row)}
                        </MaterialTableRowColumn>
                      );
                    })}
                 </PureRow>
               ))}
            </MaterialTableBody>
          </MaterialTable>
        </div>
      </div>
    );
  }
}

const TableLoading = (props) => {
  let { loading, error } = props;
  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <Table {...props} />;
};

const {
  arrayOf,
  bool,
  string,
  func,
  number,
} = React.PropTypes;

Table.propTypes = {
  data: arrayOf(),
  columns: arrayOf(),
  loading: bool,
  error: bool,
  sortState: string,
  sortField: string,
  sortClick: func,
};

export default TableLoading;
