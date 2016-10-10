import {
  playerWardmapActions,
} from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  data: {},
};

export default createReducer(initialState, playerWardmapActions);

export const getPlayerWardmap = {
  getPlayerWardmapById: (state, id) => state.app.gotPlayer.mmr.byId[id] || { ...initialState },
  getPlayerWardmap: (state, id) => getPlayerWardmap.getPlayerWardmapById(state, id).data,
  getError: (state, id) => getPlayerWardmap.getPlayerWardmapById(state, id).error,
  getLoading: (state, id) => getPlayerWardmap.getPlayerWardmapById(state, id).loading,
  isLoaded: (state, id) => getPlayerWardmap.getPlayerWardmapById(state, id).loaded,
};
