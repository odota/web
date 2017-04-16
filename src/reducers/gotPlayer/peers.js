import { playerPeersActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerPeersActions);

export const getPlayerPeers = {
  getPlayerPeersById: (state, id) => state.app.gotPlayer.peers.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).error,
  getLoading: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loading,
  isLoaded: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loaded,
  getPeerList: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).list,
};
