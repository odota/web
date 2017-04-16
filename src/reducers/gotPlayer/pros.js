import { playerProsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerProsActions);

export const getPlayerPros = {
  getPlayerProsById: (state, id) => state.app.gotPlayer.pros.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerPros.getPlayerProsById(state, id).error,
  getLoading: (state, id) => getPlayerPros.getPlayerProsById(state, id).loading,
  isLoaded: (state, id) => getPlayerPros.getPlayerProsById(state, id).loaded,
  getProsList: (state, id) => getPlayerPros.getPlayerProsById(state, id).list,
};
