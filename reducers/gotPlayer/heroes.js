import { playerHeroesActions } from '../../actions';
import { SORT_ENUM } from '../utility';

const initialState = {
  loading: true,
  error: false,
  heroes: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case playerHeroesActions.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case playerHeroesActions.OK:
      return {
        ...state,
        loading: false,
        heroes: [...action.payload],
      };
    case playerHeroesActions.ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case playerHeroesActions.SORT:
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
