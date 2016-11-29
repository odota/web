import { playerHistogramActions } from 'actions';
import createReducer from 'reducers/reducerFactory';

const initialHistogramState = {
  list: [],
  error: false,
  loading: true,
  loaded: false,
};

const initialState = {
  [undefined]: initialHistogramState,
};

export default createReducer(initialState, playerHistogramActions, true);

export const getPlayerHistogram = {
  getPlayerHistogramById: (state, id) => state.app.gotPlayer.histogram.byId[id] || { ...initialState },
  getHistogram: histogramName => (state, id) => getPlayerHistogram.getPlayerHistogramById(state, id)[histogramName] || initialHistogramState,
  getError: histogramName => (state, id) => getPlayerHistogram.getHistogram(histogramName)(state, id).error,
  getLoading: histogramName => (state, id) => getPlayerHistogram.getHistogram(histogramName)(state, id).loading,
  isLoaded: histogramName => (state, id) => getPlayerHistogram.getHistogram(histogramName)(state, id).loaded,
  getHistogramList: histogramName => (state, id) => getPlayerHistogram.getHistogram(histogramName)(state, id).list,
};
// TODO - change action to send over in a list
// TODO - fix counts so it won't break with new reducer thing
