import React from 'react';
import { MatchesTable } from '../Table';

export default ({ params }) => (
  <div>
    {params && params.account_id && <MatchesTable playerId={params.account_id} />}
  </div>
);
