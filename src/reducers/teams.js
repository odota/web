import { teamsActions } from 'actions';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, teamsActions);

export const getTeams = {
  ...selectors(state => state.app.teams),
};
