import React from 'react';
import { MatchTable } from '../Table';
import Error from '../Error';

export default ({ params }) => (
  <div>
    {params && params.match_id && <MatchTable matchId={params.match_id} />}
    {(!params || !params.match_id) && <Error />}
  </div>
);
