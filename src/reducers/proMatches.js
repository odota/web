import { proMatchesActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, proMatchesActions);

export const getProMatches = {
  ...selectors(state => state.app.proMatches),
};
