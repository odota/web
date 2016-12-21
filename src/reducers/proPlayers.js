import { proPlayersActions } from 'actions';
import fuzzy from 'fuzzy';
import { listData, selectors } from './reducerFactory';

const initialState = {
  loaded: false,
  error: false,
  loading: false,
  list: [],
};

export default listData(initialState, proPlayersActions);

const extract = item => `${item.name}${item.team_name}`;

export const getProPlayers = {
  ...selectors(state => state.app.proPlayers),
  getFilteredList: (state, query) => fuzzy.filter(query, getProPlayers.getList(state), { extract })
    .map(item => ({ ...item.original })),
};
