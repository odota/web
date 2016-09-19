import React from 'react';
import PercentContainer from '../../PercentContainer';
import { transformations, getPercentWin } from '../../../utility';
import TablePercent from '../../Table/TablePercent';

export const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.1,
  displayFn: transformations.hero_id,
  sortFn: (row) => (row.last_played),
}, {
  displayName: 'mp',
  field: 'games',
  width: 1,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: (row) => {
    const percent = getPercentWin(row.win, row.games);
    return (
      <TablePercent
        text={percent}
        val1={percent}
      />
    );
  },
  sortFn: (row) => (row.win / row.games),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: (row) => {
    const percent = getPercentWin(row.with_win, row.with_games);
    return (
      <TablePercent
        text={percent}
        val1={percent}
      />
    );
  },
  sortFn: (row) => (row.with_win / row.with_games),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: (row) => {
    const percent = getPercentWin(row.against_win, row.against_games);
    return (
      <TablePercent
        text={percent}
        val1={percent}
      />
    );
  },
  sortFn: (row) => (row.against_win / row.against_games),
}];

export const playerHeroesColumns = [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];
