import React from 'react';
import { defaultSort } from './utility';

export default [{
  displayName: 'ID',
  field: 'match_id',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Hero',
  field: 'hero_id',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => <img src={field.display ? field.display.img : ''} style={{ height: '24px' }} role="presentation" />,
}, {
  displayName: 'W/L',
  field: 'radiant_win',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 2.5,
  sortFn: defaultSort,
}, {
  displayName: 'Date',
  field: 'start_time',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Duration',
  field: 'duration',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Kills',
  field: 'kills',
  width: 1.8,
  sortFn: defaultSort,
}, {
  displayName: 'Deaths',
  field: 'deaths',
  width: 1.8,
  sortFn: defaultSort,
}, {
  displayName: 'Assists',
  field: 'assists',
  width: 1.8,
  sortFn: defaultSort,
}];
