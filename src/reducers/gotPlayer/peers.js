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
};
