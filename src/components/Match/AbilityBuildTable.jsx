import React from 'react';
import PropTypes from 'prop-types';
import { isRadiant, getTeamName } from '../../utility';
import { IconRadiant, IconDire } from '../Icons';
import Heading from '../Heading';
import Table from '../Table';

const filterMatchPlayers = (players, team = '') =>
  players
    .filter(player => (team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')
    .sort((a, b) => a.player_slot - b.player_slot);

const AbilityBuildTable = ({
  players = [], columns, heading = '', radiantTeam = {}, direTeam = {}, summable = false,
}) => (
  <div>
    <Heading title={`${getTeamName(radiantTeam, true)} - ${heading}`} icon={<IconRadiant />} />
    <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} />
    <Heading title={`${getTeamName(direTeam, false)} - ${heading}`} icon={<IconDire />} />
    <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} />
  </div>
);

AbilityBuildTable.propTypes = {
  players: PropTypes.arrayOf({}),
  columns: PropTypes.arrayOf({}),
  heading: PropTypes.string,
  radiantTeam: PropTypes.arrayOf({}),
  direTeam: PropTypes.arrayOf({}),
  summable: PropTypes.bool,
};

export default AbilityBuildTable;
