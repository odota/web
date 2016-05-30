import React from 'react';
import { PlayerMatchesTable } from '../Table';
import Error from '../Error';

export default ({ params }) => (
  <div>
    {params && params.account_id && <PlayerMatchesTable playerId={params.account_id} numMatches={10} />}
    {(!params || !params.account_id) && <Error />}
  </div>
);
