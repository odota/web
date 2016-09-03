import React from 'react';
import constants from 'dotaconstants';
import { Link } from 'react-router';
import { AppBadge } from '../Player';
import styles from './Match.css';
import { API_HOST } from '../../config.js';

const heroTd = (row, col, field) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <div className={row.isRadiant ? styles.radiant : styles.dire} />
      <img src={constants.heroes[field] ? `${API_HOST}${constants.heroes[field].img}` : ''} style={{ height: 24 }} role="presentation" />
      {row.last_login && row.last_login && <span style={{ marginLeft: 3 }}><AppBadge /></span>}
    </div>
    {row.account_id ? <Link to={`/players/${row.account_id}`}>{row.personaname}</Link> : 'Anonymous'}
  </div>
);

const heroTdColumn = {
  displayName: 'Player',
  field: 'hero_id',
  width: 3.5,
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

const overallColumns = [
  heroTdColumn,
  {
    displayName: 'Stacked',
    field: 'camps_stacked',
    width: 1,
    sortFn: true,
  },
  {
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
    field: 'biggest_hit',
    width: 1,
    sortFn: true,
    /*
    displayFn: (row, column, field) => {
            td.nowrap
              - player.max_hero_hit = player.max_hero_hit || {}
              - var ability = constants.abilities[player.max_hero_hit.inflictor]
              - var item = constants.items[player.max_hero_hit.inflictor]
              - var hero = constants.hero_names[player.max_hero_hit.key]
              span.img-text
                if ability
                  span: img.img-sm.ability(src=ability.img, title=player.max_hero_hit.inflictor)
                else if item
                  span: img.img-sm.item(src=item.img, title=player.max_hero_hit.inflictor)
                else
                  span: img.img-sm(src="/public/images/default_attack.png", title="Auto Attack/Other")
                div #{player.max_hero_hit.value}
              if hero
                span.img-text: img.img-md(src=hero.img, title=hero.localized_name)
              else
                =player.max_hero_hit.key
    },
    */
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
  }, {
    displayName: 'LH@10',
    field: 'lh_t',
    width: 1,
    sortFn: true,
  }, {
    displayName: 'DN@10',
    field: 'dn_t',
    width: 1,
    sortFn: true,
  }];

// TODO party indicator
// Lane map
// skills (casts/hits/damage)
// items (casts/hits/damage)
// purchase counts
// purchase times
// Hero kill times
// Ward maps
// Unit kills
// Last Hits
// Graphs
// Stuns/Dead/biggest hit
// Teamfights
// Chat
// Analysis
// Combat
// Gold/XP sources
// Streaks

export {
  overviewColumns,
  abUpgradeColumns,
  benchmarksColumns,
  overallColumns,
  laningColumns,
};
