import { createSelector } from 'reselect';
import { playerPeers } from 'reducers';

const getPeers = id => state => playerPeers.getPeerList(state, id);

const transformPlayerPeersById = id => createSelector(
  [getPeers(id)],
  peers => peers
);

export default transformPlayerPeersById;
