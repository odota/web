import { playerTotalsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerTotalsActions);

export const getPlayerTotals = {
  getPlayerTotalsById: (state, id) => state.app.gotPlayer.totals.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerTotals.getPlayerTotalsById(state, id).error,
  getLoading: (state, id) => getPlayerTotals.getPlayerTotalsById(state, id).loading,
  isLoaded: (state, id) => getPlayerTotals.getPlayerTotalsById(state, id).loaded,
  getTotalsList: (state, id) => getPlayerTotals.getPlayerTotalsById(state, id).list,
};
