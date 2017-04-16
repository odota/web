import { playerRecordsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
};

export default createReducer(initialState, playerRecordsActions);

export const getPlayerRecords = {
  getPlayerRecordsById: (state, id) => state.app.gotPlayer.records.byId[id] || { ...initialState },
  getError: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).error,
  getLoading: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).loading,
  isLoaded: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).loaded,
  getRecordsList: (state, id) => getPlayerRecords.getPlayerRecordsById(state, id).list,
};
