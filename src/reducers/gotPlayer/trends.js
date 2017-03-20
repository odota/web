import {
  playerTrendsActions,
} from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerTrendsActions);

export const getPlayerTrends = {
  getPlayerTrendsById: (state, id) => state.app.gotPlayer.trends.byId[id] || { ...initialState },
  getPlayerTrends: (state, id) => getPlayerTrends.getPlayerTrendsById(state, id),
  getError: (state, id) => getPlayerTrends.getPlayerTrends(state, id).error,
  getLoading: (state, id) => getPlayerTrends.getPlayerTrends(state, id).loading,
  isLoaded: (state, id) => getPlayerTrends.getPlayerTrends(state, id).loaded,
  getTrendsList: (state, id) => getPlayerTrends.getPlayerTrends(state, id).list,
};
