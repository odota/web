import React from 'react';
import { Link } from 'react-router';
import { API_HOST } from '../../../yasp.config';

export default [{
  displayName: 'stat',
  field: 'name',
  width: 1,
  displayFn: ({ field }) => field.display.replace(/_(.)/g, ' $1').toUpperCase(),
}, {
  displayName: 'hero',
  field: 'hero_id',
  width: 1,
  displayFn: ({ field }) => (
    <div>
      <img src={field.display ? `${API_HOST}${field.display.img}` : ''} style={{ height: 24 }} role="presentation" />
      <div className="subText">{field.display ? field.display.localized_name : ''}</div>
    </div>
  ),
}, {
  displayName: 'record',
  field: 'value',
  width: 1,
}, {
  displayName: 'set',
  field: 'start_time',
  width: 1,
  displayFn: ({ field, row }) => <Link to={`/matches/${row.match_id.display}`}>{field.display}</Link>,
}];
