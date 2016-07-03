import React from 'react';
import styles from './utility.css';
import PiePercent from '../../PiePercent';

export const defaultSort = (array, field, property = 'display') => array.sort((a, b) => {
  if (a[field][property] < b[field][property]) return -1;
  if (a[field][property] > b[field][property]) return 1;
  return 0;
});

export const useOriginalValueSort = (array, field) => defaultSort(array, field, 'value');

export const transformedSort = (transformFn, ...args) => {
  const [array, field] = args;
  const property = 'display';
  return array.sort((a, b) => {
    if (transformFn(a, field, property) < transformFn(b, field, property)) return -1;
    if (transformFn(a, field, property) > transformFn(b, field, property)) return 1;
    return 0;
  });
};

export const winPercentTransform = numGamesField => (list, field, property) =>
  (list[numGamesField][property] ? list[field][property] / list[numGamesField][property] : 0);

export const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

export const PercentComponent = ({ wins, games }) => (
  <div className={styles.percentContainer}>
    <span className={styles.textContainer}>{getPercentWin(wins, games).toFixed(1)}</span>
    <span>
      <PiePercent percent={getPercentWin(wins, games)} />
    </span>
  </div>
);
