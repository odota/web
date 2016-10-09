import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import strings from 'lang';
import style from './Heroes.css';

// const alignCenter = { textAlign: 'center' };

const BenchmarkRow = ({ data, id }) => (
  <TableRow selectable={false} className={style[`BenchmarkRow-${id % 2}`]}>
    {Object.keys(data).map((stat, i) => (
      <TableRowColumn
        key={i}
      >
        {stat === 'percentile' ? `${data[stat] * 100}%` : Number(data[stat].toFixed(2))}
      </TableRowColumn>
    ))}
  </TableRow>
);

export default ({ data }) => (
  <Table wrapperStyle={{ overflow: 'visible' }} className={style.BenchmarkTable}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {Object.keys(data[0]).map(stat => (
          <TableHeaderColumn
            key={stat}
            tooltip={strings[`tooltip_${stat}`]}
          >
            {strings[`th_${stat}`] || stat}
          </TableHeaderColumn>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {data.map((d, i) => <BenchmarkRow key={i} data={d} />)}
    </TableBody>
  </Table>
);
