import { playerMatchesActions } from '../../actions';
import { SORT_ENUM } from '../utility';
import { combineReducers } from 'redux';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  matchList: [],
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

const matches = (state = initialState, action) => {
  switch (action.type) {
    case playerMatchesActions.REQUEST:
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case playerMatchesActions.OK:
      return {
        ...state,
        loading: false,
        loaded: true,
        matchList: [...action.payload],
      };
    case playerMatchesActions.ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
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


const byId = (state = {}, action) => {
  switch (action.type) {
    case playerMatchesActions.REQUEST:
    case playerMatchesActions.OK:
    case playerMatchesActions.ERROR:
      return {
        ...state,
        [action.id]: matches(state[action.id], action),
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case playerMatchesActions.OK:
      if (state.includes(action.id)) {
        return state;
      }
      return [...state, action.id];
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  allIds,
});


export const getPlayerMatches = {
  getPlayerMatchesById: (state, id) => {
    if (!state.yaspReducer.gotPlayer.matches.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.yaspReducer.gotPlayer.matches.byId[id];
  },
  getError: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).error,
  getLoading: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loading,
  isLoaded: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).loaded,
  getMatchList: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).matchList,
  getSortState: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).sortState,
  getSortFn: (state, id) => getPlayerMatches.getPlayerMatchesById(state, id).sortFn,
};
