import React from 'react';
import { Link } from 'react-router';
import { YaspBadge } from '../../Player';
import { defaultSort } from './utility';
import styles from './column.css';
import { API_HOST } from '../../../yasp.config.js';
import constants from 'dotaconstants';

const heroTd = ({ field, row }) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <div className={row.isRadiant.value ? styles.radiant : styles.dire}></div>
      <img src={field.display ? `${API_HOST}${field.display.img}` : ''} style={{ height: 24 }} role="presentation" />
      {row.last_login && row.last_login.value && <span style={{ marginLeft: 3 }}><YaspBadge /></span>}
    </div>
    {row.account_id.value ? <Link to={`/players/${row.account_id.value}`}>{row.personaname.value}</Link> : 'Anonymous'}
  </div>
);

const heroTdColumn = {
  displayName: 'Player',
  field: 'hero_id',
  width: 3.5,
  displayFn: heroTd,
  sortFn: (array, field, property) => (defaultSort(array, 'player_slot'))
};

const abbreviateNumber = function (num) {
  return (num < 1000) ? num : `${(num / 1000).toFixed(1)}k`;
};

const overviewColumns = [
  heroTdColumn,
  {
    displayName: 'MMR',
    field: 'solo_competitive_rank',
    width: 1,
    sortFn: defaultSort,
  },
  {
    displayName: 'LVL',
    field: 'level',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'K',
    field: 'kills',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'D',
    field: 'deaths',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'A',
    field: 'assists',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'LH',
    field: 'last_hits',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'DN',
    field: 'denies',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'G',
    field: 'gold_per_min',
    width: 1,
    displayFn: ({ row }) => abbreviateNumber(row.gold_per_min.value * row.duration.value / 60),
    sortFn: defaultSort,
  }, {
    displayName: 'GPM',
    field: 'gold_per_min',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'XPM',
    field: 'xp_per_min',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'HD',
    field: 'hero_damage',
    width: 1,
    displayFn: ({ row }) => abbreviateNumber(row.hero_damage.value),
    sortFn: defaultSort,
  }, {
    displayName: 'TD',
    field: 'tower_damage',
    width: 1,
    displayFn: ({ row }) => abbreviateNumber(row.tower_damage.value),
    sortFn: defaultSort,
  }, {
    displayName: 'HH',
    field: 'hero_healing',
    width: 1,
    displayFn: ({ row }) => abbreviateNumber(row.hero_healing.value),
    sortFn: defaultSort,
  }, {
    displayName: 'Items',
    field: '',
    width: 7,
    displayFn: ({ row }) => {
      const itemArray = [];
      for (let i = 0; i < 6; i++) {
        if (row[`item_${i}`].display) {
          itemArray.push(<img key={i} style={{ height: 25, margin: '0 3px' }} role="presentation" src={row[`item_${i}`].display} />);
        }
      }
      return itemArray;
    },
  }];
const abUpgradeColumns = [
  heroTdColumn,
];
for (let i = 0; i < 25; i++) {
  abUpgradeColumns.push({
    displayName: i + 1,
    field: 'ability_upgrades_arr',
    index: i,
    width: 1,
    displayFn: ({ column, field }) => {
      // TODO - why does this code get executed when the abUpgradeColumnsTable doesn't get rendered...
      if (field) {
        const abilityId = field.value[column.index];
        const abilityData = constants.abilities[constants.ability_ids[abilityId]];
        if (abilityData) {
          return <img src={`${API_HOST}${abilityData.img}`} style={{ height: 35, position: 'relative', left: -10 }} role="presentation" />;
        }
      }
      return null;
    },
  });
}

const benchmarksColumns = (match) => {
  const cols = [
    heroTdColumn,
  ];
  if (match.players[0] && match.players[0].benchmarks) {
    Object.keys(match.players[0].benchmarks).forEach(function(key, i) {
      cols.push({
        displayName: key,
        field: 'benchmarks',
        index: i,
        width: 1,
        displayFn: ({ column, field }) => {
          if (field) {
            const bm = field.value[key];
              return <div>{`${bm.pct}/${bm.raw}`}</div>;
          }
          return null;
        },
      }); 
    });
  }
  return cols;
};


export { 
  overviewColumns, 
  abUpgradeColumns,
  benchmarksColumns,
};
