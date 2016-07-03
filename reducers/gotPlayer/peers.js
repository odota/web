import { playerPeersActions } from '../../actions';
import { SORT_ENUM } from '../utility';
import { combineReducers } from 'redux';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  peerList: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

const peers = (state = initialState, action) => {
  switch (action.type) {
    case playerPeersActions.REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case playerPeersActions.OK:
      return {
        ...state,
        loading: false,
        loaded: true,
        peerList: [...action.payload],
      };
    case playerPeersActions.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };
    case playerPeersActions.SORT:
      return {
        ...state,
        sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
        sortField: action.sortField,
        sortFn: action.sortFn,
      };
    default:
      return state;
  }
};


const byId = (state = {}, action) => {
  switch (action.type) {
    case playerPeersActions.REQUEST:
    case playerPeersActions.OK:
    case playerPeersActions.ERROR:
    case playerPeersActions.SORT:
      return {
        ...state,
        [action.id]: peers(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case playerPeersActions.OK:
      if (state.includes(action.id)) {
        return state;
      }
      return [...state, action.id];
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
});


export const getPlayerPeers = {
  getPlayerPeersById: (state, id) => {
    if (!state.yaspReducer.gotPlayer.peers.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.yaspReducer.gotPlayer.peers.byId[id];
  },
  getError: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).error,
  getLoading: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loading,
  isLoaded: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).loaded,
  getPeerList: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).peerList,
  getSortState: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortState,
  getSortField: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortField,
  getSortFn: (state, id) => getPlayerPeers.getPlayerPeersById(state, id).sortFn,
};
