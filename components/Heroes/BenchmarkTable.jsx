import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { tooltips, abbrv } from './../../language/en/';
import style from './Heroes.css';

const alignCenter = { textAlign: 'center' };

const BenchmarkRow = ({ data, id }) => (
  <TableRow selectable={false} className={style[`BenchmarkRow-${id % 2}`]}>
    {Object.keys(data).map((stat, i) => {
      if (stat === 'percentile') {
        return (
          <TableRowColumn
            key={i}
            style={alignCenter}
            className={style.BenchmarkColNo}
          >
            {data[stat] * 100}%
          </TableRowColumn>
        );
      }

      return (
        <TableRowColumn
          key={i}
          style={alignCenter}
        >
          {data[stat].toFixed(2)}
        </TableRowColumn>
      );
    })}
  </TableRow>
);

export default ({ data }) => (
  <Table wrapperStyle={{ overflow: 'visible' }} className={style.BenchmarkTable}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {Object.keys(data[0]).map(stat => {
          if (stat === 'percentile') {
            return (
              <TableHeaderColumn
                key={stat}
                tooltip={tooltips[stat]}
                style={alignCenter}
                className={style.BenchmarkColNo}
              >
                {abbrv[stat]}
              </TableHeaderColumn>
            );
          }

          return (
            <TableHeaderColumn
              key={stat}
              tooltip={tooltips[stat]}
              style={alignCenter}
            >
              {abbrv[stat]}
            </TableHeaderColumn>
          );
        })}
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {data.map((d, i) => <BenchmarkRow key={i} data={d} />)}
    </TableBody>
  </Table>
);
