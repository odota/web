import React from 'react';
import {
  Table,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui/Table';
import {
  heroes,
} from 'dotaconstants';
import {
  heroTd,
} from './matchColumns';

const CrossTable = ({
  match,
  field1,
  field2,
}) => (
  <Table selectable={false}>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>Hero</TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map(p => (
          <TableRowColumn key={p.hero_id}>
            {heroTd(p, 'hero_id', p.hero_id, true)}
          </TableRowColumn>)
        )}
      </TableRow>
      {match.players.slice(match.players.length / 2, match.players.length).map(p => (<TableRow key={p.hero_id}>
        <TableRowColumn>{heroTd(p, 'hero_id', p.hero_id, true)}</TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map(p2 => {
          const hero2 = heroes[p2.hero_id] || {};
          return <TableRowColumn key={p2.hero_id}>{`${(p[field1] || {})[hero2.name] || 0}/${(p[field2] || {})[hero2.name] || 0}`}</TableRowColumn>;
        })}
      </TableRow>))}
    </TableBody>
  </Table>);

export default CrossTable;
