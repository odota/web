import React, { PropTypes } from 'react';
import TabBar from 'components/TabBar';
import { playerTab } from './structures';

const Performances = ({ match, routeParams }) => {
  const playerTabs = [];
  const route = Number(routeParams.subInfo) || match.players[0].hero_id;

  match.players.map((player, i) => playerTabs.push(playerTab(player, i, routeParams, match.duration)));

  const tab = match && playerTabs.find(tab => tab.key === route);

  return (
    <div>
      <TabBar info={route} tabs={playerTabs} />
      {tab && tab.content()}
    </div>
  );
};

Performances.propTypes = {
  match: PropTypes.object,
  routeParams: PropTypes.object,
};

export default Performances;
