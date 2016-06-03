import { playerMatchesActions } from '../../actions';

const SORT_ENUM = {
  0: 'asc',
  1: 'desc',
  asc: 0,
  desc: 1,
  next: (state) => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};

const initialState = {
  loading: true,
  error: false,
  matches: [],
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
        matches: [...action.payload],
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
