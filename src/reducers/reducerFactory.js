import { combineReducers } from 'redux';
import { SORT_ENUM } from 'utility';

export const idReducerSeed = (actions, data) => {
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

  return {
    allIds,
    byId,
  };
};

const objectData = (initialState, actions) => {
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

  return (state = initialState, { name = 'data', ...action }) => {
    switch (action.type) {
      case actions.REQUEST:
        return {
          ...state,
          [name]: {
            ...state[name],
            loaded: false,
            error: false,
            loading: true,
          },
        };
      case actions.OK:
        return {
          ...state,
          [name]: {
            ...state[name],
            ...action.payload,
            loading: false,
            error: false,
            loaded: true,
          },
        };
      case actions.ERROR:
        return {
          ...state,
          [name]: {
            ...state[name],
            loading: false,
            loaded: false,
            error: true,
          },
        };
      case actions.SORT:
        if (action.listName) {
          return {
            ...state,
            [name]: {
              ...state[name],
              [action.listName]: objectSort(state.data[action.listName], action),
            },
          };
        }
        return state;
        // TODO: fix this if we ever need it
        // return {
        //   ...state,
        //   sortState: action.sortField === state.sortField ? SORT_ENUM.next(SORT_ENUM[state.sortState]) : SORT_ENUM[0],
        //   sortField: action.sortField,
        //   sortFn: action.sortFn,
        // };
      default:
        return state;
    }
  };
};

const listData = (initialState, actions) => (state = initialState, action) => {
  switch (action.type) {
    case actions.REQUEST:
      return {
        ...state,
        loaded: false,
        error: false,
        loading: true,
      };
    case actions.OK:
      return {
        ...state,
        loading: false,
        error: false,
        loaded: true,
        maxSize: !!action.maxSize,
        list: [...action.payload],
      };
    case actions.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
      };
    case actions.SORT:
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

export default (initialState, actions, isObject) => {
  const data = isObject ? objectData(initialState, actions) : listData(initialState, actions);
  const idReducers = idReducerSeed(actions, data);

  return combineReducers({
    ...idReducers,
  });
};
