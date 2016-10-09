import { playerCountsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  list: [],
  data: {},
};

// Need to have separate actions for each table and then combine them

const countsReducer = createReducer(initialState, playerCountsActions, true);

export default countsReducer;

export const getPlayerCounts = {
  getPlayerCountsById: (state, id) => {
    if (!state.app.gotPlayer.counts.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.counts.byId[id];
  },
  getOnlyData: (state, id) => {
    const data = getPlayerCounts.getPlayerCountsById(state, id).data;
    return Object.keys(data)
      .reduce((filteredObj, key) => {
        if (key !== 'loading' && key !== 'loaded' && key !== 'error') {
          return {
            ...filteredObj,
            [key]: data[key],
          };
        }
        return filteredObj;
      }, {});
  },
  getError: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].error,
  getLoading: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].loading,
  isLoaded: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].loaded,
  getCountsList: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].list,
  getCountsName: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].name,
};
