import React from 'react';
import { Link } from 'react-router';
import { YaspBadge } from '../../Player';
import { defaultSort } from './utility';
import styles from './column.css';

const overviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.5,
  displayFn: ({ field, row }) => (
    <div style={{ marginTop: 5 }}>
      <div>
        <div className={row.isRadiant.value ? styles.radiant : styles.dire}></div>
        <img src={field.display} style={{ height: 30, borderRadius: 2 }} role="presentation" />
        {row.last_login && row.last_login.value && <span style={{ marginLeft: 3 }}><YaspBadge /></span>}
      </div>
      {row.account_id.value ? <Link to={`/players/${row.account_id.value}`}>{row.personaname.value}</Link> : 'Anonymous'}
    </div>
  ),
}, {
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
        itemArray.push(<img key={i} style={{ height: 25, margin: '0 3px', borderRadius: 2 }} role="presentation" src={row[`item_${i}`].display} />);
      }
    }
    return itemArray;
  },
}];

export { overviewColumns };
