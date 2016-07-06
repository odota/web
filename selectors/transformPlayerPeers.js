import { createSelector } from 'reselect';
import { playerPeers } from '../reducers';
import { transformationFunction } from './utility';

const getPeers = id => state => playerPeers.getPeerList(state, id);

const transformPlayerPeersById = id => createSelector(
  [getPeers(id)],
  peers => transformationFunction(peers)
);

export default transformPlayerPeersById;
