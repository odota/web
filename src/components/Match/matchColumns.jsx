import React from 'react';
import constants from 'dotaconstants';
import { Link } from 'react-router';
import { API_HOST } from 'config.js';
// import { AppBadge } from '../Player';
import styles from './Match.css';

// {row.last_login && row.last_login && <span style={{ marginLeft: 3 }}><AppBadge /></span>}
const heroTd = (row, col, field, hideName) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <div className={row.isRadiant ? styles.radiant : styles.dire} />
      <img src={constants.heroes[field] ? `${API_HOST}${constants.heroes[field].img}` : ''} style={{ height: 24 }} role="presentation" />
      {!hideName && <span>{row.account_id ? <Link to={`/players/${row.account_id}`}>{row.personaname}</Link> : 'Anonymous'}</span>}
    </div>
  </div>
);

const heroTdColumn = {
  displayName: 'Player',
  field: 'hero_id',
  width: 3,
  displayFn: heroTd,
  sortFn: (row) => (row.player_slot),
};

const abbreviateNumber = function abbreviateNumber(num) {
  return (num < 1000) ? num : `${(num / 1000).toFixed(1)}k`;
};

const overviewColumns = [
  heroTdColumn,
  {
    displayName: 'MMR',
    field: 'solo_competitive_rank',
    width: 1,
    sortFn: true,
  },
  {
    displayName: 'LVL',
    field: 'level',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'K',
    field: 'kills',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'D',
    field: 'deaths',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'A',
    field: 'assists',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'LH',
    field: 'last_hits',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'DN',
    field: 'denies',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'G',
    field: 'gold_per_min',
    width: 1,
    displayFn: (row) => abbreviateNumber((row.gold_per_min * row.duration) / 60),
    sortFn: true,
  }, {
    displayName: 'GPM',
    field: 'gold_per_min',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'XPM',
    field: 'xp_per_min',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'HD',
    field: 'hero_damage',
    width: 1,
    displayFn: (row) => abbreviateNumber(row.hero_damage),
    sortFn: true,
  }, {
    displayName: 'TD',
    field: 'tower_damage',
    width: 1,
    displayFn: (row) => abbreviateNumber(row.tower_damage),
    sortFn: true,
  }, {
    displayName: 'HH',
    field: 'hero_healing',
    width: 1,
    displayFn: (row) => abbreviateNumber(row.hero_healing),
    sortFn: true,
  }, {
    displayName: 'Items',
    field: '',
    width: 7,
    displayFn: (row) => {
      const itemArray = [];
      for (let i = 0; i < 6; i++) {
        const item = constants.items[constants.item_ids[row[`item_${i}`]]];
        if (item) {
          itemArray.push(<span
            key={i}
            style={{ position: 'relative' }}
          >
            <img
              style={{ height: 25, margin: '0 3px' }}
              role="presentation"
              src={`${API_HOST}${item.img}`}
            />
            <span className={styles.timing}>
              {row.first_purchase_time
                ? `${(row.first_purchase_time[constants.item_ids[item.id]] / 60).toFixed(0)}'`
                : ''}
            </span>
          </span>);
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
    displayFn: (row, column, field) => {
      if (field) {
        const abilityId = field[column.index];
        const abilityKey = constants.ability_ids[abilityId];
        let abilityData = constants.abilities[abilityKey];
        if (abilityKey === 'attribute_bonus') {
          abilityData = {
            dname: 'Attribute Bonus',
            img: '/assets/stats.png',
            attrib: '+2 All Attributes',
          };
        }
        if (abilityData) {
          return (<img
            src={abilityKey === 'attribute_bonus' ? abilityData.img : `${API_HOST}${abilityData.img}`}
            style={{ height: 35, position: 'relative', left: -10 }}
            role="presentation"
          />);
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
    Object.keys(match.players[0].benchmarks).forEach((key, i) => {
      cols.push({
        displayName: key,
        field: 'benchmarks',
        index: i,
        width: 2,
        displayFn: (row, column, field) => {
          if (field) {
            const bm = field[key];
            return (<div>
              <span>{`${Number(bm.pct * 100).toFixed(2)}%`}</span>
              <span>{bm.raw.toFixed(2)}</span>
            </div>);
          }
          return null;
        },
      });
    });
  }
  return cols;
};

const purchaseTimesColumns = (match) => {
  const cols = [heroTdColumn];
  const bucket = 300;
  for (let i = 0; i < match.duration + bucket; i += bucket) {
    const curTime = i;
    cols.push({
      displayName: `${curTime / 60}'`,
      field: 'purchase_log',
      width: 1,
      displayFn: (row, column, field) => (<div>
        {field
        .filter(p => (p.time >= curTime - bucket && p.time < curTime))
        .map((p, i) => {
          const item = constants.items[p.key] || {};
          return <span key={i}><img src={`${API_HOST}${item.img}`} role="presentation" style={{ height: '20px' }} /><br />{p.time}</span>;
        })
        }
      </div>),
    });
  }
  return cols;
};


const overallColumns = [
  heroTdColumn,
  {
    displayName: 'Stacked',
    field: 'camps_stacked',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'Multikill',
    field: 'multi_kills_max',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'Streak',
    field: 'kill_streaks_max',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'Stuns',
    field: 'stuns',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'Dead',
    field: 'life_state_dead',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'Biggest Hit',
    field: 'max_hero_hit',
    width: 1,
    sortFn: true,
    displayFn: (row, column, field) => {
      if (field) {
        const ability = constants.abilities[field.inflictor];
        const item = constants.items[field.inflictor];
        const hero = constants.hero_names[field.key] || { img: '' };
        let props = { src: null, title: null };
        if (ability) {
          props = { src: `${API_HOST}${ability.img}` };
        } else if (item) {
          props = { src: `${API_HOST}${item.img}` };
        } else {
          props = { src: `${API_HOST}/public/images/default_attack.png` };
        }
        return (<div>
          <img src={props.src} className={styles.imgSmall} role="presentation" />
          <div>{field.value}</div>
          <img src={`${API_HOST}${hero.img}`} className={styles.imgSmall} role="presentation" />
        </div>);
      }
      return <div />;
    },
  }];

const laningColumns = [
  heroTdColumn,
  {
    displayName: 'Lane',
    field: '',
    width: 1,
    sortFn: true,
  },
  {
    displayName: 'EFF@10',
    field: 'lane_efficiency',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.toFixed(2) : ''),
  }, {
    displayName: 'LH@10',
    field: 'lh_t',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field[10] : ''),
  }, {
    displayName: 'DN@10',
    field: 'dn_t',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field[10] : ''),
  }];

const purchaseColumns = [
  heroTdColumn,
  {
    displayName: 'TP',
    tooltip: 'Town Portal Scrolls purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, { tpscroll }) => tpscroll,
  }, {
    displayName: 'Observers',
    tooltip: 'Observer wards purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.ward_observer : ''),
  }, {
    displayName: 'Sentries',
    tooltip: 'Sentry wards purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.ward_sentry : ''),
  }, {
    displayName: 'Smokes',
    tooltip: 'Smokes of Deceit purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.smoke_of_deceit : ''),
  }, {
    displayName: 'Dusts',
    tooltip: 'Dusts of Appearance purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, { dust }) => dust,
  }, {
    displayName: 'Gems',
    tooltip: 'Gems of True Sight purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, { gem }) => gem,
  }, {
    displayName: 'Rapiers',
    tooltip: 'Divine Rapiers purchased',
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, { rapier }) => rapier,
  }];

const chatColumns = [
  heroTdColumn,
  { displayName: 'Time', field: 'time' },
  { displayName: 'Message', field: 'key' },
];

const abilityUseColumns = [{ displayName: 'Ability', field: 'name' },
            { displayName: 'Casts', field: 'ability_uses', sortFn: true },
            { displayName: 'Hits', field: 'hero_hits', sortFn: true },
            { displayName: 'Damage', field: 'damage_inflictor', sortFn: true }];

const itemUseColumns = [{ displayName: 'Item', field: 'name' },
            { displayName: 'Casts', field: 'item_uses', sortFn: true },
            { displayName: 'Hits', field: 'hero_hits', sortFn: true },
            { displayName: 'Damage', field: 'damage_inflictor', sortFn: true }];

const actionsColumns = [];

// TODO party indicator
// Lane map
// Hero kill times
// Ward maps
// Unit kills
// Last Hits
// Graphs (radiant adv/gold/xp/lh)
// objective log
// runes
// Teamfights
// Analysis
// actions
// cosmetics
// Gold/XP sources

export {
  heroTd,
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
  overallColumns,
  laningColumns,
  chatColumns,
  purchaseColumns,
  purchaseTimesColumns,
  actionsColumns,
  abilityUseColumns,
  itemUseColumns,
};
