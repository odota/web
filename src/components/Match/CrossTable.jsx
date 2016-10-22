import React from 'react';
import {
  Table,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui/Table';
import heroes from 'dotaconstants/json/heroes.json';
import { abbreviateNumber } from 'utility';
import { heroTd } from './matchColumns';

const CrossTable = ({
  match,
  field1,
  field2,
}) => (
  <Table selectable={false}>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn>Hero</TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map((player, i) => (
          <TableRowColumn key={player.hero_id}>
            {heroTd(player, 'hero_id', player.hero_id, i, true)}
          </TableRowColumn>)
        )}
      </TableRow>
      {match.players.slice(match.players.length / 2, match.players.length).map((player, i) => (<TableRow key={player.hero_id}>
        <TableRowColumn>{heroTd(player, 'hero_id', player.hero_id, i, true)}</TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map((p2) => {
          const hero2 = heroes[p2.hero_id] || {};
          const pfield1 = player[field1] || {};
          const pfield2 = player[field2] || {};
          return (<TableRowColumn key={p2.hero_id}>
            {`${abbreviateNumber(pfield1[hero2.name] || 0)}/${abbreviateNumber(pfield2[hero2.name] || 0)}`}
          </TableRowColumn>);
        })}
      </TableRow>))}
    </TableBody>
  </Table>);

export default CrossTable;
