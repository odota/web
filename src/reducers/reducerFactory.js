import { combineReducers } from 'redux';
import SORT_ENUM from 'utility';

export default (initialState, actions, isObject) => {
  const initialObjectSortState = {
    sortState: '',
    sortField: '',
    sortFn: f => f,
  };

  const objectSort = (state = initialObjectSortState, action) => ({
    ...state,
    sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
    sortField: action.sortField,
    sortFn: action.sortFn,
  });

  const data = (state = initialState, action) => {
    switch (action.type) {
      case actions.REQUEST:
        return {
          ...state,
          loaded: false,
          error: false,
          loading: true,
        };
      case actions.OK:
        if (isObject) {
          return {
            ...state,
            loading: false,
            error: false,
            loaded: true,
            data: { ...action.payload },
          };
        }
        return {
          ...state,
          loading: false,
          error: false,
          loaded: true,
          list: [...action.payload],
        };
      case actions.ERROR:
        if (isObject) {
          return {
            ...state,
            loading: false,
            loaded: false,
            error: true,
          };
        }
        return {
          ...state,
          loading: false,
          loaded: false,
          error: true,
        };
      case actions.SORT:
        if (isObject && action.listName) {
          return {
            ...state,
            data: {
              ...state.data,
              [action.listName]: objectSort(state.data[action.listName], action),
            },
          };
        }
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


  const byId = (state = {}, action) => {
    switch (action.type) {
      case actions.REQUEST:
      case actions.OK:
      case actions.ERROR:
      case actions.SORT:
        return {
          ...state,
          [action.id]: data(state[action.id], action),
        };
      default:
        return state;
    }
  };

  const allIds = (state = [], action) => {
    switch (action.type) {
      case actions.OK:
        if (state.includes(action.id)) {
          return state;
        }
        return [...state, action.id];
      default:
        return state;
    }
  };

  return combineReducers({
    byId,
    allIds,
  });
};
