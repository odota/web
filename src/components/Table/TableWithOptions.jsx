import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Table from './Table';
import withSort from './SortedTable';
import withPagination from './PaginatedTable';

class TableWithOptions extends Component {
  componentWillMount() {
    this.id = uuid.v4();
  }

  render() {
    const { paginated, maxRows, data = [], ...rest } = this.props;
    let TableWithOptions = Table;

    if (paginated) {
      TableWithOptions = withPagination(TableWithOptions, this.id);
    }

    TableWithOptions = withSort(TableWithOptions, this.id);

    // we don't care about 0 row tables right?
    const modifiedData = maxRows && maxRows <= data.length ?
      data.slice(0, maxRows) :
      data;

    return <TableWithOptions data={modifiedData} {...rest} />;
  }
}

const { bool, number, arrayOf, object } = PropTypes;

TableWithOptions.propTypes = {
  paginated: bool,
  maxRows: number,
  data: arrayOf(object),
};

export default TableWithOptions;
