import { createSelector } from 'reselect';
import { playerPeers } from 'reducers';
import transformPlayerPeersById from 'selectors/transformPlayerPeers';
import { defaultSort } from 'utility';

const getSortState = id => state => playerPeers.getSortState(state, id);
const getSortField = id => state => playerPeers.getSortField(state, id);
const getSortFn = id => state => playerPeers.getSortFn(state, id);

const sortPlayerPeers = id => createSelector(
  [transformPlayerPeersById(id), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerPeers;
