import {
  playerWordcloudActions,
} from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  data: {},
};

export default createReducer(initialState, playerWordcloudActions, true);

export const getPlayerWordcloud = {
  getPlayerWordcloudById: (state, id) => state.app.gotPlayer.wordcloud.byId[id] || { ...initialState },
  getPlayerWordcloud: (state, id) => getPlayerWordcloud.getPlayerWordcloudById(state, id).data,
  getError: (state, id) => getPlayerWordcloud.getPlayerWordcloud(state, id).error,
  getLoading: (state, id) => getPlayerWordcloud.getPlayerWordcloud(state, id).loading,
  isLoaded: (state, id) => getPlayerWordcloud.getPlayerWordcloud(state, id).loaded,
};
