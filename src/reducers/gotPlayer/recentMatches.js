import { playerRecentMatchesActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerRecentMatchesActions);

export const getPlayerRecentMatches = {
  getPlayerRecentMatchesById: (state, id) => state.app.gotPlayer.recentMatches.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerRecentMatches.getPlayerRecentMatchesById(state, id).error,
  getLoading: (state, id) => getPlayerRecentMatches.getPlayerRecentMatchesById(state, id).loading,
  isLoaded: (state, id) => getPlayerRecentMatches.getPlayerRecentMatchesById(state, id).loaded,
  getMatchList: (state, id) => getPlayerRecentMatches.getPlayerRecentMatchesById(state, id).list,
};
