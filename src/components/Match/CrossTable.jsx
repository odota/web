import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableRow,
  TableRowColumn,
  TableBody,
} from 'material-ui/Table';
import heroes from 'dotaconstants/build/heroes.json';
import ReactTooltip from 'react-tooltip';
import { abbreviateNumber } from 'utility';
import strings from 'lang';
import { IconRadiant, IconDire } from 'components/Icons';
import { heroTd } from './matchColumns';
import constants from '../constants';

const teamIconStyle = { width: '30px', height: '30px' };

const CrossTable = ({
  match,
  field1,
  field2,
}) => (
  <Table selectable={false} >
    <TableBody displayRowCheckbox={false}>
      <TableRow>
        <TableRowColumn />
        {match.players.slice(match.players.length / 2, match.players.length).map((player, i) => (
          <TableRowColumn key={player.hero_id}>
            {heroTd(player, 'hero_id', player.hero_id, i, true)}
          </TableRowColumn>))}
        <TableRowColumn>
          <div style={teamIconStyle}>
            <IconDire />
          </div>
        </TableRowColumn>
      </TableRow>
      {match.players.slice(0, match.players.length / 2).map((player, i) => (
        <TableRow key={player.hero_id}>
          <TableRowColumn>{heroTd(player, 'hero_id', player.hero_id, i, true)}</TableRowColumn>
          {match.players.slice(match.players.length / 2, match.players.length).map((player2) => {
          const hero1 = heroes[player.hero_id] || {};
          const hero2 = heroes[player2.hero_id] || {};
          const pfield1 = player[field1] || {};
          const pfield2 = player[field2] || {};
          const pvalue1 = pfield1[hero2.name] || 0;
          const pvalue2 = pfield2[hero2.name] || 0;
          return (
            <TableRowColumn key={player2.hero_id}>
              <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`}>
                <span style={{ color: pvalue1 > pvalue2 ? constants.colorSuccess : '' }}>{abbreviateNumber(pvalue1)}</span>
                {'/'}
                <span style={{ color: pvalue2 > pvalue1 ? constants.colorDanger : '' }}>{abbreviateNumber(pvalue2)}</span>
                <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_${player2.player_slot}`} place="top" effect="solid">
                  {`${hero1.localized_name} → ${hero2.localized_name}: ${pvalue1}`}
                  <br />
                  {`${hero2.localized_name} → ${hero1.localized_name}: ${pvalue2}`}
                </ReactTooltip>
              </div>
            </TableRowColumn>);
        })}
          {(() => {
          const hero1 = heroes[player.hero_id] || {};
          let ptotal1 = 0;
          let ptotal2 = 0;

          match.players.slice(match.players.length / 2, match.players.length).forEach((player2) => {
            const hero2 = heroes[player2.hero_id] || {};
            ptotal1 += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
            ptotal2 += (player[field2] && hero2.name in player[field2]) ? player[field2][hero2.name] : 0;
          });

          return (
            <TableRowColumn key={`${player.hero_id}_totals`}>
              <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_radiant`}>
                <span style={{ color: ptotal1 > ptotal2 ? constants.colorSuccess : '' }}>{abbreviateNumber(ptotal1)}</span>
                {'/'}
                <span style={{ color: ptotal2 > ptotal1 ? constants.colorDanger : '' }}>{abbreviateNumber(ptotal2)}</span>
                <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_radiant`} place="top" effect="solid">
                  {`${hero1.localized_name} → ${strings.general_dire}: ${ptotal1}`}
                  <br />
                  {`${strings.general_dire} → ${hero1.localized_name}: ${ptotal2}`}
                </ReactTooltip>
              </div>
            </TableRowColumn>
          );
        })()}
        </TableRow>))}
      <TableRow>
        <TableRowColumn>
          <div style={teamIconStyle}>
            <IconRadiant />
          </div>
        </TableRowColumn>
        { match.players.slice(match.players.length / 2, match.players.length).map((player) => {
          const hero1 = heroes[player.hero_id] || {};
          let ptotal1 = 0;
          let ptotal2 = 0;

          match.players.slice(0, match.players.length / 2).forEach((player2) => {
            const hero2 = heroes[player2.hero_id] || {};
            ptotal1 += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
            ptotal2 += (player[field2] && hero2.name in player[field2]) ? player[field2][hero2.name] : 0;
          });

          return (
            <TableRowColumn key={`${player.hero_id}_totals`}>
              <div data-tip data-for={`${field1}_${field2}_${player.player_slot}_dire`}>
                <span style={{ color: ptotal2 > ptotal1 ? constants.colorSuccess : '' }}>{abbreviateNumber(ptotal2)}</span>
                {'/'}
                <span style={{ color: ptotal1 > ptotal2 ? constants.colorDanger : '' }}>{abbreviateNumber(ptotal1)}</span>
                <ReactTooltip id={`${field1}_${field2}_${player.player_slot}_dire`} place="top" effect="solid">
                  {`${strings.general_radiant} → ${hero1.localized_name}: ${ptotal2}`}
                  <br />
                  {`${hero1.localized_name} → ${strings.general_radiant}: ${ptotal1}`}
                </ReactTooltip>
              </div>
            </TableRowColumn>
          );
        }) }
        {(() => {
          let radiantTotal = 0;
          let direTotal = 0;

          match.players.slice(match.players.length / 2, match.players.length).forEach((player) => {
            const hero = heroes[player.hero_id] || {};
            match.players.slice(0, match.players.length / 2).forEach((player2) => {
              const hero2 = heroes[player2.hero_id] || {};
              radiantTotal += (player2[field1] && hero.name in player2[field1]) ? player2[field1][hero.name] : 0;
              direTotal += (player[field1] && hero2.name in player[field1]) ? player[field1][hero2.name] : 0;
            });
          });

          return (
            <TableRowColumn>
              <div data-tip data-for={`${field1}_${field2}_total`}>
                <span style={{ color: radiantTotal > direTotal ? constants.colorSuccess : '' }}>{abbreviateNumber(radiantTotal)}</span>
                {'/'}
                <span style={{ color: direTotal > radiantTotal ? constants.colorDanger : '' }}>{abbreviateNumber(direTotal)}</span>
                <ReactTooltip id={`${field1}_${field2}_total`} place="top" effect="solid">
                  {`${strings.general_radiant} → ${strings.general_dire}: ${radiantTotal}`}
                  <br />
                  {`${strings.general_dire} → ${strings.general_radiant}: ${direTotal}`}
                </ReactTooltip>
              </div>
            </TableRowColumn>
          );
        })()}
      </TableRow>
    </TableBody>
  </Table>);

CrossTable.propTypes = {
  match: PropTypes.shape({}),
  field1: PropTypes.string,
  field2: PropTypes.string,
};

export default CrossTable;
