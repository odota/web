import React from 'react';
import { Link } from 'react-router';
import { transformations, prettyPrint } from '../../../utility';

export default [{
  displayName: 'record',
  field: 'name',
  width: 1,
  displayFn: prettyPrint,
}, {
  displayName: 'hero',
  field: 'hero_id',
  width: 1,
  displayFn: transformations.hero_id,
}, {
  displayName: 'record',
  field: 'value',
  width: 1,
}, {
  displayName: 'set',
  field: 'start_time',
  width: 1,
  // sortFn: true,
  displayFn: (row, col, field) => <Link to={`/matches/${row.match_id}`}>{transformations.start_time(row, col, field)}</Link>,
}];
