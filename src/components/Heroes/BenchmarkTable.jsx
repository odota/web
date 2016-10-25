import React from 'react';
import Table from 'components/Table';
import strings from 'lang';

const columns = data => Object.keys(data[0] || {}).map(stat => ({
  displayName: strings[`th_${stat}`],
  tooltip: strings[`tooltip_${stat}`],
  field: stat,
  displayFn: (row, col, field) => (stat === 'percentile' ? `${field * 100}%` : Number(field.toFixed(2))),
}));

export default ({ data }) => (<Table data={data} columns={columns(data)} />);
