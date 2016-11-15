import { tableActions } from 'actions';
import { SORT_ENUM, defaultSort } from 'utility';

const initialState = {
  currentPage: 0,
  totalPages: 0,
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case tableActions.SORT:
      return {
        ...state,
        sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
        sortField: action.sortField,
        sortFn: action.sortFn,
      };
    case tableActions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.pageNumber,
      };
    case tableActions.NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case tableActions.PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  switch (action.type) {
    case tableActions.SET_CURRENT_PAGE:
    case tableActions.NEXT_PAGE:
    case tableActions.PREV_PAGE:
    case tableActions.SORT:
      return {
        ...state,
        [action.id]: table(state[action.id], action),
      };
    default:
      return state;
  }
};

export const getTable = {
  getTable: (state, id) => state.app.table[id] || initialState,
  getCurrentPage: (state, id) => getTable.getTable(state, id).currentPage,
  getTotalPages: (state, id) => getTable.getTable(state, id).totalPages,
  getSortState: (state, id) => getTable.getTable(state, id).sortState,
  getSortField: (state, id) => getTable.getTable(state, id).sortField,
  getSortFn: (state, id) => getTable.getTable(state, id).sortFn,
  getSortedData: data => (state, id) => (
    !getTable.getSortField(state, id) ?
    data :
    defaultSort(
      data,
      getTable.getSortState(state, id),
      getTable.getSortField(state, id),
      getTable.getSortFn(state, id),
    )),
};
