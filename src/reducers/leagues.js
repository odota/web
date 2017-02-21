import { leaguesActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, leaguesActions);

export const getLeagues = {
  ...selectors(state => state.app.leagues),
};
