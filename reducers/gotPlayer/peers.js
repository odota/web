import { playerPeersActions } from '../../actions';
import createReducer from '../reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default createReducer(initialState, playerPeersActions);

export const getPlayerPeers = {
  getPlayerPeersById: (state, id) => {
    if (!state.app.gotPlayer.peers.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.peers.byId[id];
  },
  getError: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).error,
  getLoading: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loading,
  isLoaded: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loaded,
  getPeerList: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).list,
  getSortState: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortState,
  getSortField: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortField,
  getSortFn: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortFn,
};
