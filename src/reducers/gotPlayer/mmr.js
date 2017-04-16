import { playerMMRActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerMMRActions);

export const getPlayerMMR = {
  getPlayerMMRById: (state, id) => state.app.gotPlayer.mmr.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerMMR.getPlayerMMRById(state, id).error,
  getLoading: (state, id) => getPlayerMMR.getPlayerMMRById(state, id).loading,
  isLoaded: (state, id) => getPlayerMMR.getPlayerMMRById(state, id).loaded,
  getList: (state, id) => getPlayerMMR.getPlayerMMRById(state, id).list,
};
