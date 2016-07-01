import React from 'react';
import { defaultSort, transformedSort, useOriginalValueSort } from './utility';
import { HOST_URL } from '../../../yasp.config';
import styles from './playerHeroesColumns.css';
import PiePercent from '../../PiePercent';

const winPercentTransform = (list, field, property) => list[field][property] / list.games[property];
const winPercentWithTransform = (list, field, property) => list[field][property] / list.with_games[property];
const winPercentAgainstTransform = (list, field, property) => list[field][property] / list.against_games[property];

const getPercentWin = (wins, games) => Math.ceil(1000 * (wins / games)) / 10;
const getPercentWinWith = (with_win, with_games) => Math.ceil(1000 * (with_win / with_games)) / 10;
const getPercentWinAgainst = (against_win, against_games) => Math.ceil(1000 * (against_win / against_games)) / 10;

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
}, {
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
  sortFn: defaultSort,displayFn: ({ field, row }) => (
    <div className={styles.percentContainer}>
      <span className={styles.textContainer}>{getPercentWinWith(field.display, row.with_games.display).toFixed(1)}</span>
      <span>
        <PiePercent percent={getPercentWinWith(field.display, row.with_games.display)} />
      </span>
    </div>
  ),
  sortFn: transformedSort.bind(null, winPercentWithTransform),
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
      <span className={styles.textContainer}>{getPercentWinAgainst(field.display, row.against_games.display).toFixed(1)}</span>
      <span>
        <PiePercent percent={getPercentWinAgainst(field.display, row.against_games.display)} />
      </span>
    </div>
  ),
  sortFn: transformedSort.bind(null, winPercentAgainstTransform),
},];
