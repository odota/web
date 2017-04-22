import { recordsActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, recordsActions);

export const getGlobalRecords = {
  ...selectors(state => state.app.records),
};
