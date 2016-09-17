import { matchActions } from '../actions';
import SORT_ENUM from './utility';

const initialState = {
  loading: true,
  error: false,
  match: {
    players: [],
    sortState: '',
    sortField: '',
    sortFn: true,
  },
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
      const { players, ...rest } = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        match: {
          ...rest,
          players,
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
      const { match, ...restState } = state;
      const { ...restMatch } = match;
      return {
        ...restState,
        match: {
          ...restMatch,
          sortState: action.sortField === match.sortField ? SORT_ENUM.next(SORT_ENUM[match.sortState]) : SORT_ENUM[0],
          sortField: action.sortField,
          sortFn: action.sortFn,
        },
      };
    }
    default:
      return state;
  }
};
