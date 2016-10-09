import React, { Component } from 'react';
import uuid from 'node-uuid';
import Table from './Table';
import withSort from './SortedTable';
import withPagination from './PaginatedTable';

class TableWithOptions extends Component {
  componentWillMount() {
    this.id = uuid.v4();
  }

  render() {
    const { sorted, paginated, ...rest } = this.props;
    let SuperTable = Table;
    if (paginated) {
      SuperTable = withPagination(SuperTable, this.id);
    }
    if (sorted) {
      SuperTable = withSort(SuperTable, this.id);
    }
    return <SuperTable {...rest} />;
  }
}

export default TableWithOptions;
