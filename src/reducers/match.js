import { matchActions } from 'actions';
import { SORT_ENUM } from 'utility';

const initialState = {
  match: {
    players: [],
  },
  sortState: '',
  sortField: '',
  sortFn: true,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case matchActions.REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case matchActions.OK: {
      return {
        ...state,
        loading: false,
        error: false,
        match: action.payload,
      };
    }
    case matchActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case matchActions.SORT: {
      return {
        ...state,
        sortField: action.sortField,
        sortFn: action.sortFn,
        sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
      };
    }
    default:
      return state;
  }
};

export const getMatch = state => state.app.match;
export const getMatchData = state => state.app.match.match;
export const getMatchLoading = state => state.app.match.loading;
export const getMatchPlayers = state => state.app.match.match.players;
export const getSortState = state => state.app.match.sortState;
export const getSortField = state => state.app.match.sortField;
export const getSortFn = state => state.app.match.sortFn;
