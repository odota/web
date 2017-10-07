import React from 'react';
import PropTypes from 'prop-types';
import { isRadiant, getTeamName } from 'utility';
import Heading from 'components/Heading';
import { IconRadiant, IconDire } from 'components/Icons';
import Table from 'components/Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')).sort((a, b) => a.player_slot - b.player_slot);

const TeamTable = ({
  players = [],
  columns,
  heading = '',
  picksBans = [],
  radiantTeam = {},
  direTeam = {},
  summable = false,
}) => (
  <div>
    <Heading
      title={`${getTeamName(radiantTeam, true)} - ${heading}`}
      icon={<IconRadiant />}
    />
    <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} />
    {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 0)} /> /* team 0 - radiant */}
    <Heading
      title={`${getTeamName(direTeam, false)} - ${heading}`}
      icon={<IconDire />}
    />
    <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} />
    {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
  </div>
);

TeamTable.propTypes = {
  players: PropTypes.arrayOf({}),
  columns: PropTypes.arrayOf({}),
  heading: PropTypes.string,
  picksBans: PropTypes.arrayOf({}),
  radiantTeam: PropTypes.shape({}),
  direTeam: PropTypes.shape({}),
  summable: PropTypes.bool,
};

export default TeamTable;
