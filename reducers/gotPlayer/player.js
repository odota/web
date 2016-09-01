import { combineReducers } from 'redux';
import { playerActions } from '../../actions';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  player: {
    profile: {},
  },
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case playerActions.REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      };
    case playerActions.OK:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        player: action.payload,
      };
    case playerActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        loaded: false,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case playerActions.REQUEST:
    case playerActions.OK:
    case playerActions.ERROR:
      return {
        ...state,
        [action.id]: player(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case playerActions.OK:
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


export const getPlayer = {
  getPlayerById: (state, id) => {
    // this feels like a hack
    if (!state.app.gotPlayer.playerReducer.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.playerReducer.byId[id];
  },
  getError: (state, id) => getPlayer.getPlayerById(state, id).error,
  getLoading: (state, id) => getPlayer.getPlayerById(state, id).loading,
  isLoaded: (state, id) => getPlayer.getPlayerById(state, id).loaded,
  getPlayer: (state, id) => getPlayer.getPlayerById(state, id).player,
  getProfile: (state, id) => getPlayer.getPlayer(state, id).profile,
  getAccountId: (state, id) => getPlayer.getPlayer(state, id).profile.account_id,
  getPlayerName: (state, id) => getPlayer.getPlayer(state, id).profile.personaname,
  getLastLogin: (state, id) => getPlayer.getPlayer(state, id).profile.last_login,
  getMmrEstimate: (state, id) => getPlayer.getPlayer(state, id).mmr_estimate,
  getSoloMmrEstimate: (state, id) => getPlayer.getPlayer(state, id).solo_competitive_rank,
  getCompetitiveRank: (state, id) => getPlayer.getPlayer(state, id).competitive_rank,
  getPicture: (state, id) => getPlayer.getProfile(state, id).avatarmedium,
  getSteamLink: (state, id) => getPlayer.getProfile(state, id).profileurl,
  getCheese: (state, id) => getPlayer.getProfile(state, id).cheese,
};
