import { playerHistogramActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialState = {
  loading: true,
  error: false,
  loaded: false,
  data: {},
  sortState: '',
  sortField: '',
  sortFn: f => f,
};

export default createReducer(initialState, playerHistogramActions, true);

export const getPlayerHistogram = {
  getPlayerHistogramById: (state, id) => {
    if (!state.app.gotPlayer.histogram.byId[id]) {
      return {
        ...initialState,
      };
    }
    return state.app.gotPlayer.histogram.byId[id];
  },
  getError: (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id).error,
  getLoading: (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id).loading,
  isLoaded: (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id).loaded,
  getData: (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id).data,
  getHistogramList: histogramName => (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id).data[histogramName] || {},
  getHistogramX: histogramName => (state, id) => getPlayerHistogram.getHistogramList(histogramName)(state, id).x,
  getHistogramY: histogramName => (state, id) => getPlayerHistogram.getHistogramList(histogramName)(state, id)[histogramName],
};
