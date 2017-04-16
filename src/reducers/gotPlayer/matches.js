import { playerMatchesActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  maxSize: false,
};

export default createReducer(initialState, playerMatchesActions);

export const getPlayerMatches = {
  getPlayerMatchesById: (state, id) => state.app.gotPlayer.matches.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).error,
  getLoading: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loading,
  isLoaded: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loaded,
  isMaxSize: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).maxSize,
  getMatchList: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).list,
};
