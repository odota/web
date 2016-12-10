import { combineReducers } from 'redux';

export const idReducerSeed = (actions, data) => {
  const byId = (state = {}, action) => {
    switch (action.type) {
      case actions.REQUEST:
      case actions.OK:
      case actions.ERROR:
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

const objectData = (initialState, actions) =>
  (state = initialState, { name = 'data', ...action }) => {
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
      default:
        return state;
    }
  };

export const listData = (initialState, actions) => (state = initialState, action) => {
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
        maxSize: action.maxSize,
        list: [...action.payload],
      };
    case actions.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
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

export const selectors = getPath => ({
  getLoading: state => getPath(state).loading,
  getLoaded: state => getPath(state).loaded,
  getError: state => getPath(state).error,
  getList: state => getPath(state).list,
});
