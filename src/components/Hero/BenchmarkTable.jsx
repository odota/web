import React from 'react';
import { connect } from 'react-redux';
import { oneOfType, shape, arrayOf } from 'prop-types';
import Table from '../Table';

const BenchmarkTable = ({ data, strings }) => {
  const columns = d => Object.keys(d[0] || {}).map(stat => ({
    displayName: strings[`th_${stat}`],
    tooltip: strings[`tooltip_${stat}`],
    field: stat,
    displayFn: (row, col, field) => (stat === 'percentile' ? `${field * 100}%` : typeof field === 'number' && Number(field.toFixed(2))),
  }));
  return (<Table data={data} columns={columns(data)} />);
};

BenchmarkTable.propTypes = {
  data: oneOfType([
    arrayOf(shape({})),
    shape({}),
  ]),
  strings: shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(BenchmarkTable);
