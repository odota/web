import React from 'react';
import { defaultSort, transformedSort } from './utility';
import { HOST_URL } from '../../../yasp.config';
import styles from './playerHeroesColumns.css';

const winPercentTransform = (list, field, property) => list[field][property] / list.games[property];

const getPercentWin = (wins, games) => Math.ceil(1000 * (wins / games)) / 10;

export default [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: ({ field }) => (
    <div style={{ marginTop: 5 }}>
      <img src={`${HOST_URL}${field.display.img}`} style={{ height: 30 }} role="presentation" />
    </div>
  ),
}, {
  displayName: 'Played',
  field: 'games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: ({ field, row }) => (
    <div className={styles.percentContainer}>
      <span className={styles.textContainer}>{getPercentWin(field.display, row.games.display).toFixed(1)}</span>
      <span>
        <svg viewBox="0 0 32 32" className={styles.pieChart}>
          <circle
            r="16" cx="16" cy="16"
            className={styles.pieInner}
            style={{ strokeDasharray: `${getPercentWin(field.display, row.games.display)} 100` }}
          />
        </svg>
      </span>
    </div>
  ),
  sortFn: transformedSort.bind(null, winPercentTransform),
}];
