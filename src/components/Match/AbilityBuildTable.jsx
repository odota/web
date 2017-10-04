import React from 'react';
import PropTypes from 'prop-types';
import { isRadiant, getTeamName } from 'utility';
import { IconRadiant, IconDire } from 'components/Icons';
import Heading from 'components/Heading';
import Table from 'components/Table';

const filterMatchPlayers = (players, team = '') =>
  players
    .filter(player => (team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === '')
    .sort((a, b) => a.player_slot - b.player_slot);

const standardizeLevel = (skilledAt, obj) => {
  // Invoker (74) is different than everyone else
  if (obj.hero_id !== 74) {
    if (skilledAt === 16) {
      return 17;
    } else if (skilledAt === 17) {
      return 19;
    } else if (skilledAt === 18) {
      return 24;
    }
  }
  return skilledAt;
};

const convertArrayToKeys = (obj, fieldName = '') => ({
  ...obj,
  ...(obj[fieldName] || []).reduce(
    (acc, cur, index) => ({
      ...acc,
      [`ability_upgrades_arr_${standardizeLevel(index, obj) + 1}`]: cur,
    }),
    {},
  ),
});

const AbilityBuildTable = ({ players = [], columns, heading = '', radiantTeam = {}, direTeam = {}, summable = false }) => {
  const keyedPlayers = players.map(player => convertArrayToKeys(player, 'ability_upgrades_arr'));
  return (
    <div>
      <Heading title={`${getTeamName(radiantTeam, true)} - ${heading}`} icon={<IconRadiant />} />
      <Table data={filterMatchPlayers(keyedPlayers, 'radiant')} columns={columns} summable={summable} />
      <Heading title={`${getTeamName(direTeam, false)} - ${heading}`} icon={<IconDire />} />
      <Table data={filterMatchPlayers(keyedPlayers, 'dire')} columns={columns} summable={summable} />
    </div>
  );
};

AbilityBuildTable.propTypes = {
  players: PropTypes.array,
  columns: PropTypes.array,
  heading: PropTypes.string,
  radiantTeam: PropTypes.object,
  direTeam: PropTypes.array,
  summable: PropTypes.bool,
};

export default AbilityBuildTable;
