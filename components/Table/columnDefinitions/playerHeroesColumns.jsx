import React from 'react';
import {
  defaultSort,
  transformedSort,
  useOriginalValueSort,
  winPercentTransform,
} from './utility';
import { PercentContainer } from '../../ColumnComponents';
import { API_HOST } from '../../../yasp.config';


const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: ({ field }) => (
    <div>
      <img src={`${API_HOST}${field.display.img}`} style={{ height: 24 }} role="presentation" />
      <div>{field.display ? field.display.localized_name : ''}</div>
    </div>),
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 2,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'Played',
  field: 'games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field.display} games={row.games.display} />,
  sortFn: transformedSort.bind(null, winPercentTransform('games')),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field.display} games={row.with_games.display} />,
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
  displayFn: ({ field, row }) => <PercentContainer wins={field.display} games={row.against_games.display} />,
  sortFn: transformedSort.bind(null, winPercentTransform('against_games')),
}];

export default [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];

export { playerHeroesOverviewColumns };
