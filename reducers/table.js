import { tableActions } from '../actions';

const initialState = {
  currentPage: 0,
  totalPages: 0,
};

const table = (state = initialState, action) => {
  switch (action.type) {
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
      return {
        ...state,
        [action.id]: table(state[action.id], action),
      };
    default:
      return state;
  }
};

export const getTable = {
  getTable: (state, id) => state.yaspReducer.table[id] || initialState,
  getCurrentPage: (state, id) => getTable.getTable(state, id).currentPage,
  getTotalPages: (state, id) => getTable.getTable(state, id).totalPages,
};
