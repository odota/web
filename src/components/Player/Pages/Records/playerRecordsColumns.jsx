import React from 'react';
import { Link } from 'react-router';
import { transformations, prettyPrint } from 'utility';
import strings from 'lang/en';

export default [{
  displayName: strings.th_record,
  field: 'name',
  width: 1,
  displayFn: prettyPrint,
}, {
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  width: 1,
  displayFn: transformations.hero_id,
}, {
  displayName: strings.th_record,
  field: 'value',
  width: 1,
}, {
  displayName: strings.th_set,
  field: 'start_time',
  width: 1,
  sortFn: true,
  displayFn: (row, col, field) => <Link to={`/matches/${row.match_id}`}>{transformations.start_time(row, col, field)}</Link>,
}];
