import { playerCountsActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  list: [],
  data: {
    loading: true,
    error: false,
    loaded: false,
  },
};

// Need to have separate actions for each table and then combine them

const countsReducer = createReducer(initialState, playerCountsActions, true);

export default countsReducer;

export const getPlayerCounts = {
  getPlayerCountsById: (state, id) => state.app.gotPlayer.counts.byId[id] || { ...initialState },
  getData: (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data,
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
  getError: (state, id) => getPlayerCounts.getData(state, id).error,
  getLoading: (state, id) => getPlayerCounts.getData(state, id).loading,
  isLoaded: (state, id) => getPlayerCounts.getData(state, id).loaded,
  getCountsList: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].list,
  getCountsName: listName => (state, id) => getPlayerCounts.getPlayerCountsById(state, id).data[listName].name,
};
