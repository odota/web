import { createSelector } from 'reselect';
import { playerPeers } from '../reducers';
import transformPlayerPeersById from './transformPlayerPeers';

const getSortState = id => state => playerPeers.getSortState(state, id);
const getSortField = id => state => playerPeers.getSortField(state, id);
const getSortFn = id => state => playerPeers.getSortFn(state, id);

const sortPlayerPeers = id => createSelector(
  [transformPlayerPeersById(id), getSortState(id), getSortField(id), getSortFn(id)],
  (peers, sortState, sortField, sortFn) =>
    (sortState === 'desc' ? sortFn(peers, sortField).reverse() : sortFn(peers, sortField))
);

export default sortPlayerPeers;
