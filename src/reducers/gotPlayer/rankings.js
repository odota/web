import { playerRankingsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerRankingsActions);

export const getPlayerRankings = {
  getPlayerRankingsById: (state, id) => state.app.gotPlayer.rankings.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerRankings.getPlayerRankingsById(state, id).error,
  getLoading: (state, id) => getPlayerRankings.getPlayerRankingsById(state, id).loading,
  isLoaded: (state, id) => getPlayerRankings.getPlayerRankingsById(state, id).loaded,
  getRankingList: (state, id) => getPlayerRankings.getPlayerRankingsById(state, id).list,
};
