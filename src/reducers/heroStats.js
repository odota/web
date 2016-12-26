import { heroStatsActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, heroStatsActions);

export const getHeroStats = {
  ...selectors(state => state.app.heroStats),
};
