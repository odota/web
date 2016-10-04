import React from 'react';
import {
  Tabs,
  Tab,
} from 'material-ui/Tabs';
import {
  heroes,
} from 'dotaconstants';
import {
  API_HOST,
} from 'config';
import Table from '../Table/Table';

const getCastArray = (pm) => {
  // Get from ability_uses, item_uses
  const resultArray = [];
  const targets = ['ability_uses', 'item_uses'];
  targets.forEach((target) => {
    if (pm[target]) {
      Object.keys(pm[target]).forEach((key) => {
        resultArray.push({
          name: key || 'Auto Attack/Other',
          val: pm[target][key],
          casts: pm[target][key],
          hero_hits: (pm.hero_hits || {})[key],
          damage_inflictor: (pm.damage_inflictor || {})[key],
        });
      });
    }
  });
  resultArray.sort((a, b) => b.val - a.val);
  return resultArray;
};

const CastTable = ({
  match,
  columns,
}) => (
  <Tabs>
    {match.players.map((p) =>
      (
      <Tab key={p.player_slot} icon={<img src={`${API_HOST}${heroes[p.hero_id].img}`} height={30} role="presentation" />}>
        <Table
          data={getCastArray(p)}
          columns={columns}
        />
      </Tab>
      ))
    }
  </Tabs>);

export default CastTable;
