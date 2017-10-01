import React from 'react';
import PropTypes from 'prop-types';
import Table from 'components/Table';
import strings from 'lang';

const columns = data => Object.keys(data[0] || {}).map(stat => ({
  displayName: strings[`th_${stat}`],
  tooltip: strings[`tooltip_${stat}`],
  field: stat,
  displayFn: (row, col, field) => (stat === 'percentile' ? `${field * 100}%` : Number(field.toFixed(2))),
}));

const BenchmarkTable = ({ data }) => (<Table data={data} columns={columns(data)} />);

BenchmarkTable.propTypes = {
  data: PropTypes.object,
};

export default BenchmarkTable;
