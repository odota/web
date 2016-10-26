import React from 'react';
import {
  Table,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui/Table';
import heroes from 'dotaconstants/json/heroes.json';
import ReactTooltip from 'react-tooltip';
import { abbreviateNumber } from 'utility';
import { heroTd } from './matchColumns';
import styles from './Match.css';

const CrossTable = ({
  match,
  field1,
  field2,
}) => (
  <Table selectable={false}>
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn></TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map((player, i) => (
          <TableRowColumn key={player.hero_id}>
            {heroTd(player, 'hero_id', player.hero_id, i, true)}
          </TableRowColumn>)
        )}
      </TableRow>
      {match.players.slice(match.players.length / 2, match.players.length).map((player, i) => (<TableRow key={player.hero_id}>
        <TableRowColumn>{heroTd(player, 'hero_id', player.hero_id, i, true)}</TableRowColumn>
        {match.players.slice(0, match.players.length / 2).map((player2) => {
          const hero1 = heroes[player.hero_id] || {};
          const hero2 = heroes[player2.hero_id] || {};
          const pfield1 = player[field1] || {};
          const pfield2 = player[field2] || {};
          const pvalue1 = pfield1[hero2.name] || 0;
          const pvalue2 = pfield2[hero2.name] || 0;
          return (<TableRowColumn key={player2.hero_id}>
            <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`}>
              <span className={pvalue1 > pvalue2 ? styles.textDanger : ''}>{abbreviateNumber(pvalue1)}</span>
              {'/'}
              <span className={pvalue2 > pvalue1 ? styles.textSuccess : ''}>{abbreviateNumber(pvalue2)}</span>
              <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`} place="top" effect="solid">
                {`${hero1.localized_name} → ${hero2.localized_name}: ${pvalue1}`}
                <br />
                {`${hero2.localized_name} → ${hero1.localized_name}: ${pvalue2}`}
              </ReactTooltip>
            </div>
          </TableRowColumn>);
        })}
      </TableRow>))}
    </TableBody>
  </Table>);

export default CrossTable;
