import React from 'react';
import { HOST_URL } from '../../../yasp.config.js';
const constants = require('../../../constants.json');

const overviewColumns = [
  {
    displayName: 'Hero',
    field: 'hero_id',
    width: 2,
  },
  {
    displayName: 'Player',
    field: 'personaname',
    width: 2,
  },
  {
    displayName: 'Kills',
    field: 'kills',
    width: 2,
  },
  {
    displayName: 'Deaths',
    field: 'deaths',
    width: 2,
  },
  {
    displayName: 'Assists',
    field: 'assists',
    width: 2,
  }];
const abUpgradeColumns = [
  {
    displayName: 'Hero',
    field: 'hero_id',
    width: 2,
  }];
for (let i = 0; i < 25; i++) {
  abUpgradeColumns.push(
    {
      displayName: i + 1,
      field: 'ability_upgrades_arr',
      index: i,
      displayFn: ({ column, field }) => {
        const abilityId = field[column.index];
        const abilityData = constants.abilities[constants.ability_ids[abilityId]];
        console.log(abilityId, abilityData);
        if (abilityData) {
          return <img src={HOST_URL + abilityData.img} style={{ height: '24px' }} role="presentation" />;
        }
        return null;
      },
    });
}
export
{
  overviewColumns, abUpgradeColumns,
};
