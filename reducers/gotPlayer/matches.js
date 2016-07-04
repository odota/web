import { playerMatchesActions } from '../../actions';
import createReducer from '../reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default createReducer(initialState, playerMatchesActions);

export const getPlayerMatches = {
  getPlayerMatchesById: (state, id) => {
    if (!state.yaspReducer.gotPlayer.matches.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.yaspReducer.gotPlayer.matches.byId[id];
  },
  getError: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).error,
  getLoading: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loading,
  isLoaded: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loaded,
  getMatchList: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).list,
  getSortState: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).sortState,
  getSortField: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).sortField,
  getSortFn: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).sortFn,
};
