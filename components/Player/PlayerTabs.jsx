import React from 'react';
import TabBar from '../TabBar';
import { playerPages } from '../Header/Pages';

const playerPagesMapped = (accountId) => playerPages.map(page => ({
  route: `/players/${accountId}/${page.name.toLowerCase()}`,
  label: page.name,
}));

export default ({ params, location }) => {
  if (location.pathname.indexOf('/players') === 0) {
    return (
      <div style={{ marginTop: 25 }}>
        <TabBar tabs={playerPagesMapped(params.account_id)} />
      </div>
    );
  }
  return '';
};
