import React from 'react';
import { defaultSort, transformedSort } from './utility';
import { HOST_URL } from '../../../yasp.config';
import styles from './playerHeroesColumns.css';
import PiePercent from '../../PiePercent';

const winPercentTransform = (list, field, property) =>
  (list.games[property] ? list[field][property] / list.games[property] : 0);

const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

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
        <PiePercent percent={getPercentWin(field.display, row.games.display)} />
      </span>
    </div>
  ),
  sortFn: transformedSort.bind(null, winPercentTransform),
}];
