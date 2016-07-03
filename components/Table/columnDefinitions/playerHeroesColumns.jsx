import React from 'react';
import { defaultSort, transformedSort, useOriginalValueSort } from './utility';
import { HOST_URL } from '../../../yasp.config';
import styles from './playerHeroesColumns.css';
import PiePercent from '../../PiePercent';

const winPercentTransform = numGamesField => (list, field, property) =>
  (list[numGamesField][property] ? list[field][property] / list[numGamesField][property] : 0);

const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: ({ field }) => (
    <div style={{ marginTop: 5 }}>
      <img src={`${HOST_URL}${field.display.img}`} style={{ height: 30 }} role="presentation" />
    </div>),
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
    </div>),
  sortFn: transformedSort.bind(null, winPercentTransform('games')),
}];

const restColumns = [{
  displayName: 'Last Match',
  field: 'last_played',
  width: 2,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: ({ field, row }) => (
    <div className={styles.percentContainer}>
      <span className={styles.textContainer}>{getPercentWin(field.display, row.with_games.display).toFixed(1)}</span>
      <span>
        <PiePercent percent={getPercentWin(field.display, row.with_games.display)} />
      </span>
    </div>),
  sortFn: transformedSort.bind(null, winPercentTransform('with_games')),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: ({ field, row }) => (
    <div className={styles.percentContainer}>
      <span className={styles.textContainer}>{getPercentWin(field.display, row.against_games.display).toFixed(1)}</span>
      <span>
        <PiePercent percent={getPercentWin(field.display, row.against_games.display)} />
      </span>
    </div>),
  sortFn: transformedSort.bind(null, winPercentTransform('against_games')),
}];

export default [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];

export { playerHeroesOverviewColumns };
