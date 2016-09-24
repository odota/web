import { playerRecordsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default createReducer(initialState, playerRecordsActions);

export const getPlayerRecords = {
  getPlayerRecordsById: (state, id) => {
    if (!state.app.gotPlayer.records.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.records.byId[id];
  },
  getError: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).error,
  getLoading: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).loading,
  isLoaded: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).loaded,
  getRecordsList: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).list,
  getSortState: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).sortState,
  getSortField: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).sortField,
  getSortFn: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).sortFn,
};
