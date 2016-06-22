import React from 'react';
import { Link } from 'react-router';
import { YaspBadge } from '../../Player';
import { defaultSort } from './utility';
import styles from './column.css';
import { HOST_URL } from '../../../yasp.config.js';
const constants = require('../../../constants.json');

const heroTd = ({ field, row }) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <div className={row.isRadiant.value ? styles.radiant : styles.dire}></div>
      <img src={field.display ? `${HOST_URL}${field.display.img}` : ''} style={{ height: 30 }} role="presentation" />
      {row.last_login && row.last_login.value && <span style={{ marginLeft: 3 }}><YaspBadge /></span>}
    </div>
    {row.account_id.value ? <Link to={`/players/${row.account_id.value}`}>{row.personaname.value}</Link> : 'Anonymous'}
  </div>
);

const overviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.5,
  displayFn: heroTd,
},
  {
    displayName: 'LVL',
    field: 'level',
    width: 1.5,
    sortFn: defaultSort,
  }, {
    displayName: 'K',
    field: 'kills',
    width: 1.5,
    sortFn: defaultSort,
  }, {
    displayName: 'D',
    field: 'deaths',
    width: 1.5,
    sortFn: defaultSort,
  }, {
    displayName: 'A',
    field: 'assists',
    width: 1.5,
    sortFn: defaultSort,
  }, {
    displayName: 'LH',
    field: 'last_hits',
    width: 2,
    sortFn: defaultSort,
  }, {
    displayName: 'D',
    field: 'denies',
    width: 1,
    sortFn: defaultSort,
  }, {
    displayName: 'G',
    field: '',
    width: 2,
    displayFn: ({ row }) => `${(row.gold_per_min.value * row.duration.value / 60 / 1000).toFixed(1)}K`,
  }, {
    displayName: 'GPM',
    field: 'gold_per_min',
    width: 2,
    sortFn: defaultSort,
  }, {
    displayName: 'XPM',
    field: 'xp_per_min',
    width: 2,
    sortFn: defaultSort,
  }, {
    displayName: 'HD',
    field: 'hero_damage',
    width: 2,
    sortFn: defaultSort,
  }, {
    displayName: 'TD',
    field: 'tower_damage',
    width: 2,
    sortFn: defaultSort,
  }, {
    displayName: 'HH',
    field: 'hero_healing',
    width: 1,
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
  {
    displayName: 'Hero',
    field: 'hero_id',
    width: 3,
    displayFn: heroTd,
  }];
for (let i = 0; i < 25; i++) {
  abUpgradeColumns.push(
    {
      displayName: i + 1,
      field: 'ability_upgrades_arr',
      index: i,
      width: 1,
      displayFn: ({ column, field }) => {
        const abilityId = field.value[column.index];
        const abilityData = constants.abilities[constants.ability_ids[abilityId]];
        if (abilityData) {
          return <img src={HOST_URL + abilityData.img} style={{ height: '24px' }} role="presentation" />;
        }
        return null;
      },
    });
}
export { overviewColumns, abUpgradeColumns };
