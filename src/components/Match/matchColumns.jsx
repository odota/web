import React from 'react';
import {
  heroes,
  runes,
  items,
  order_types as orderTypes,
  item_ids as itemIds,
  ability_ids as abilityIds,
  hero_names as heroNames,
} from 'dotaconstants';
import strings from 'lang';
import {
  Link,
} from 'react-router';
import {
  API_HOST,
} from 'config.js';
// import { AppBadge } from '../Player';
import styles from './Match.css';

// {row.last_login && row.last_login && <span style={{ marginLeft: 3 }}><AppBadge /></span>}
const heroTd = (row, col, field, hideName) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <div className={row.isRadiant ? styles.radiant : styles.dire} />
      <img src={heroes[field] ? `${API_HOST}${heroes[field].img}` : ''} style={{ height: 24 }} role="presentation" />
      {!hideName && <div>{row.account_id ? <Link to={`/players/${row.account_id}`}>{row.personaname}</Link> : 'Anonymous'}</div>}
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
  heroTdColumn, {
    displayName: 'MMR',
    field: 'solo_competitive_rank',
    width: 1,
    sortFn: true,
  }, {
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
        const item = items[itemIds[row[`item_${i}`]]];
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
                ? `${(row.first_purchase_time[itemIds[item.id]] / 60).toFixed(0)}'`
                : ''}
            </span>
          </span>);
        }
      }
      return itemArray;
    },
  },
];
const abUpgradeColumns = [
  heroTdColumn,
].concat(Array.from(new Array(25)).map((e, i) => ({
  displayName: i + 1,
  field: 'ability_upgrades_arr',
  index: i,
  width: 1,
  displayFn: (row, column, field) => {
    if (field) {
      const abilityId = field[column.index];
      const abilityKey = abilityIds[abilityId];
      let abilityData = {
        img: `${API_HOST}/apps/dota2/images/abilities/${abilityKey}_md.png`,
      };
      if (abilityKey === 'attribute_bonus') {
        abilityData = {
          dname: 'Attribute Bonus',
          img: '/assets/images/stats.png',
          attrib: '+2 All Attributes',
        };
      }
      if (abilityData) {
        return (<img
          src={abilityData.img}
          style={{ height: 35, position: 'relative', left: -10 }}
          role="presentation"
        />);
      }
    }
    return null;
  },
})));

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
        {field ? field
        .filter(p => (p.time >= curTime - bucket && p.time < curTime))
        .map((p, i) => {
          const item = items[p.key] || {};
          return <span key={i}><img src={`${API_HOST}${item.img}`} role="presentation" style={{ height: '20px' }} /><br />{p.time}</span>;
        }) : ''}
      </div>),
    });
  }
  return cols;
};

const lastHitsTimesColumns = (match) => {
  const cols = [heroTdColumn];
  const bucket = 300;
  for (let i = 0; i < match.duration + bucket; i += bucket) {
    const curTime = i;
    cols.push({
      displayName: `${curTime / 60}'`,
      field: 'lh_t',
      width: 1,
      displayFn: (row, column, field) => (<div>
        {field ? field[curTime / 60] : ''}
      </div>),
    });
  }
  return cols;
};

const overallColumns = [
  heroTdColumn, {
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
        // const ability = abilities[field.inflictor];
        // TODO map the ability data somehow
        const ability = null;
        const item = items[field.inflictor];
        const hero = heroNames[field.key] || {
          img: '',
        };
        let props = {
          src: null,
          title: null,
        };
        if (ability) {
          props = {
            src: `${API_HOST}${ability.img}`,
          };
        } else if (item) {
          props = {
            src: `${API_HOST}${item.img}`,
          };
        } else {
          props = {
            src: `${API_HOST}/public/images/default_attack.png`,
          };
        }
        return (<div>
          <img src={props.src} className={styles.imgSmall} role="presentation" />
          <div>{field.value}</div>
          <img src={`${API_HOST}${hero.img}`} className={styles.imgSmall} role="presentation" />
        </div>);
      }
      return <div />;
    },
  },
];

const laningColumns = [
  heroTdColumn, {
    displayName: 'Lane',
    field: '',
    width: 1,
    sortFn: true,
  }, {
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
  },
];

const purchaseColumns = [
  heroTdColumn, {
    displayName: 'TP',
    tooltip: strings.purchase_tpscroll,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.tpscroll : '-'),
  }, {
    displayName: 'Observers',
    tooltip: strings.purchase_ward_observer,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.ward_observer : '-'),
  }, {
    displayName: 'Sentries',
    tooltip: strings.purchase_ward_sentry,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.ward_sentry : '-'),
  }, {
    displayName: 'Smokes',
    tooltip: strings.purchase_smoke_of_deceit,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.smoke_of_deceit : '-'),
  }, {
    displayName: 'Dusts',
    tooltip: strings.purchase_dust,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.dust : '-'),
  }, {
    displayName: 'Gems',
    tooltip: strings.purchase_gem,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.gem : '-'),
  }, {
    displayName: 'Rapiers',
    tooltip: strings.purchase_rapier,
    field: 'purchase',
    width: 1,
    sortFn: true,
    displayFn: (row, col, field) => (field ? field.rapier : '-'),
  },
];

const chatColumns = [
  heroTdColumn, {
    displayName: 'Time',
    field: 'time',
  }, {
    displayName: 'Message',
    field: 'key',
  },
];

const abilityUseColumns = [{
  displayName: 'Ability',
  field: 'name',
}, {
  displayName: 'Casts',
  field: 'ability_uses',
  sortFn: true,
}, {
  displayName: 'Hits',
  field: 'hero_hits',
  sortFn: true,
}, {
  displayName: 'Damage',
  field: 'damage_inflictor',
  sortFn: true,
}];

const itemUseColumns = [{
  displayName: 'Item',
  field: 'name',
}, {
  displayName: 'Casts',
  field: 'item_uses',
  sortFn: true,
}, {
  displayName: 'Hits',
  field: 'hero_hits',
  sortFn: true,
}, {
  displayName: 'Damage',
  field: 'damage_inflictor',
  sortFn: true,
}];

const unitKillsColumns = [
  heroTdColumn, {
    displayName: 'Heroes',
    tooltip: strings.farm_heroes,
    field: 'hero_kills',
    sortFn: true,
  }, {
    displayName: 'Creeps',
    tooltip: strings.farm_creeps,
    field: 'lane_kills',
    sortFn: true,
  }, {
    displayName: 'Neutrals',
    tooltip: strings.farm_neutrals,
    field: 'neutral_kills',
    sortFn: true,
  }, {
    displayName: 'Ancients',
    tooltip: strings.farm_ancients,
    field: 'ancient_kills',
    sortFn: true,
  }, {
    displayName: 'Towers',
    tooltip: strings.farm_towers,
    field: 'tower_kills',
    sortFn: true,
  }, {
    displayName: 'Couriers',
    tooltip: strings.farm_couriers,
    field: 'courier_kills',
    sortFn: true,
  }, {
    displayName: 'Roshans',
    tooltip: strings.farm_roshan,
    field: 'roshan_kills',
    sortFn: true,
  }, {
    displayName: 'Necronomicons',
    tooltip: strings.farm_necronomicon,
    field: 'necronomicon_kills',
    sortFn: true,
  }, {
    displayName: 'Other',
    field: 'specific',
    displayFn: (row, col, field) => JSON.stringify(field),
  },
];

const actionsColumns = [heroTdColumn, {
    displayName: 'APM',
    tooltip: strings.actions_per_min,
    field: 'actions_per_min',
  }, {
    displayName: 'Pings',
    tooltip: strings.pings,
    field: 'pings',
  }]
  .concat(Object.keys(orderTypes).filter(o => orderTypes[o] in strings).map(k => ({
    displayName: strings[`${orderTypes[k]}_abbr`],
    tooltip: strings[orderTypes[k]],
    field: 'actions',
    displayFn: (row, col, field) => (field ? field[k] : '-'),
  })));
  
const runesColumns = [heroTdColumn]
  .concat(Object.keys(runes).map(k => ({
    displayName: strings[`rune_${k}`],
    field: 'runes',
    displayFn: (row, col, field) => (field ? field[k] : '-'),
  })));

const cosmeticsColumns = [];

const objectiveDamageColumns = [];

const objectiveLogColumns = [];

// TODO
// party indicator
// cosmetics
// Gold/XP sources
// Objective damage
// Hero kill times
// objective log
// Teamfights
// Analysis
// Lane map
// Ward maps
// Graphs (radiant adv/gold/xp/lh)

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
  abilityUseColumns,
  itemUseColumns,
  unitKillsColumns,
  actionsColumns,
  lastHitsTimesColumns,
  runesColumns,
  cosmeticsColumns,
  objectiveDamageColumns,
  objectiveLogColumns,
};
