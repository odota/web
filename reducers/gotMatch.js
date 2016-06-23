import { matchActions } from '../actions';
import { SORT_ENUM } from './utility';

const initialState = {
  loading: true,
  error: false,
  match: {
    players: {
      matchArray: [],
      sortState: '',
      sortField: '',
      sortFn: f => f,
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case matchActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case matchActions.OK: {
      const { players, ...rest } = action.payload;
      return {
        ...state,
        loading: false,
        match: {
          ...rest,
          players: {
            matchArray: players,
          },
        },
      };
    }
    case matchActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case matchActions.SORT: {
      const { match, ...rest } = state;
      const { players, ...restMatch } = match;
      return {
        ...rest,
        match: {
          ...restMatch,
          players: {
            matchArray: players.matchArray,
            sortState: action.sortField === players.sortField ? SORT_ENUM.next(SORT_ENUM[players.sortState]) : SORT_ENUM[0],
            sortField: action.sortField,
            sortFn: action.sortFn,
          },
        },

      };
    }
    default:
      return state;
  }
};
