import React from 'react';
import { defaultSort, useOriginalValueSort } from './utility';
import { WinLoss } from '../../ColumnComponents';
import { Link } from 'react-router';
import { HOST_URL } from '../../../yasp.config';

export default [{
  displayName: 'ID',
  field: 'match_id',
  width: 2.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => <Link to={`/matches/${field.display}`}>{field.display}</Link>,
}, {
  displayName: 'Hero',
  field: 'hero_id',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => (
    <div>
      <img src={field.display ? `${HOST_URL}${field.display.img}` : ''} style={{ height: 24 }} role="presentation" />
      <div>{field.display ? field.display.localized_name : ''}</div>
    </div>),
}, {
  displayName: 'Result',
  field: 'radiant_win',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: ({ field }) => <WinLoss result={field.display} />,
}, {
  displayName: 'Skill',
  field: 'skill',
  width: 1.5,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 2.5,
  sortFn: defaultSort,
}, {
  displayName: 'Ended',
  field: 'start_time',
  width: 2,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'Duration',
  field: 'duration',
  width: 2,
  sortFn: useOriginalValueSort,
}, {
  displayName: 'K',
  field: 'kills',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'D',
  field: 'deaths',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'A',
  field: 'assists',
  width: 1,
  sortFn: defaultSort,
}];
