import React from 'react';
import { MatchTable } from '../Table';
import Error from '../Error';
const columns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  sorted: false,
}, {
  displayName: 'Kills',
  field: 'kills',
  width: 2,
  sorted: false,
}, {
  displayName: 'Deaths',
  field: 'deaths',
  width: 2,
  sorted: false,
}, {
  displayName: 'Assists',
  field: 'assists',
  width: 2,
  sorted: false,
}];
export default ({ params }) => (
  <div>
    {params && params.match_id && <MatchTable matchId={params.match_id} columns={columns}/>}
    {(!params || !params.match_id) && <Error />}
  </div>
);
