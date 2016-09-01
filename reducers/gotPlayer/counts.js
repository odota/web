import { playerCountsActions } from '../../actions';
import createReducer from '../reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  data: {},
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

// Need to have separate actions for each table and then combine them

const countsReducer = createReducer(initialState, playerCountsActions, true);

export default countsReducer;

export const getPlayerCounts = {
  getPlayerCountsById: (state, id) => {
    if (!state.app.gotPlayer.counts.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.counts.byId[id];
  },
  getError: (state, id) => getPlayerCounts.getPlayerCountsById(state, id).error,
  getLoading: (state, id) => getPlayerCounts.getPlayerCountsById(state, id).loading,
  isLoaded: (state, id) => getPlayerCounts.getPlayerCountsById(state, id).loaded,
  getCountsList: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName],
  getSortState: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].sortState,
  getSortField: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].sortField,
  getSortFn: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].sortFn,
};
