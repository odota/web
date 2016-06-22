import { playerMatchesActions } from '../../actions';
import { SORT_ENUM } from '../utility';

const initialState = {
  loading: true,
  error: false,
  matchList: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case playerMatchesActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerMatchesActions.OK:
      return {
        ...state,
        loading: false,
        matchList: [...action.payload],
      };
    case playerMatchesActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case playerMatchesActions.SORT:
      return {
        ...state,
        sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
        sortField: action.sortField,
        sortFn: action.sortFn,
      };
    default:
      return state;
  }
};
