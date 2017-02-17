import { publicMatchesActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, publicMatchesActions);

export const getPublicMatches = {
  ...selectors(state => state.app.publicMatches),
};
