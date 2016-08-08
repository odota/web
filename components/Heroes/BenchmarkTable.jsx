import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import style from './Heroes.css';


const metrics = [
  'percentile',
  'gold_per_min',
  'xp_per_min',
  'last_hits_per_min',
  'kills_per_min',
  'hero_damage_per_min',
  'hero_healing_per_min',
  'tower_damage_per_min',
];
const alignCenter = { textAlign: 'center' };

const BenchmarkRow = ({ data, id, percentile }) => (
  <TableRow selectable={false} className={style[`BenchmarkRow-${id % 2}`]}>
    {metrics.map((metric, i) => {
      if (metric === 'percentile') {
        return (
          <TableRowColumn key={i} style={alignCenter} className={style.BenchmarkColNo}>
            {percentile * 100}%
          </TableRowColumn>
        );
      }

      return (
        <TableRowColumn key={i} style={alignCenter}>
          {data[metric][id].value.toFixed(2)}
        </TableRowColumn>
      );
    })}
  </TableRow>
);

export default ({ data }) => (
  <Table wrapperStyle={{ overflow: 'visible' }} className={style.BenchmarkTable}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn tooltip="Percentile" style={alignCenter} className={style.BenchmarkColNo}>%</TableHeaderColumn>
        <TableHeaderColumn tooltip="Gold per minute" style={alignCenter}>GPM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Exp per minute" style={alignCenter}>XPM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Last hits per minute" style={alignCenter}>LHM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Kill per minute" style={alignCenter}>KPM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Hero damage per minute" style={alignCenter}>HDM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Hero healing per minute" style={alignCenter}>HHM</TableHeaderColumn>
        <TableHeaderColumn tooltip="Tower damage per minute" style={alignCenter}>TDM</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {data.gold_per_min.map((gpm, idx) =>
        <BenchmarkRow key={idx} data={data} id={idx} percentile={gpm.percentile} />)}
    </TableBody>
  </Table>
);
