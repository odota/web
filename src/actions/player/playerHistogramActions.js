import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import { playerHistogram } from 'reducers';
import { getUrl } from 'actions/utility';
import { bucketizeColumns } from 'utility';

// const excludedOptions = ['limit'];
const url =
  histogramName =>
   playerId =>
    `/api/players/${playerId}/histograms/${histogramName}`;

const REQUEST = 'playerHistogram/REQUEST';
const OK = 'playerHistogram/OK';
const ERROR = 'playerHistogram/ERROR';

export const playerHistogramActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerHistogramRequest = (id) => ({ type: REQUEST, id });

export const getPlayerHistogramOk = (payload, id, histogramName) => ({
  type: OK,
  payload: {
    [histogramName]: payload,
  },
  id,
});

export const getPlayerHistogramError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});


export const getPlayerHistogram = (playerId, histogramName, host = API_HOST) => (dispatch, getState) => {
  if (playerHistogram.isLoaded(getState(), playerId, histogramName)) {
    dispatch(getPlayerHistogramOk(
      playerHistogram.getData(getState(), playerId, histogramName),
      playerId,
      histogramName
    ));
  } else {
    dispatch(getPlayerHistogramRequest(playerId, histogramName));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, null, url(histogramName))}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json =>
      Object.keys(json).reduce((columns, key) => {
        columns.x.push(key);
        columns[histogramName].push(json[key]);
        return columns;
      }, {
        x: [],
        [histogramName]: [],
      }))
    .then(json => bucketizeColumns(json[histogramName], json.x, histogramName))
    .then(json => dispatch(getPlayerHistogramOk(json, playerId, histogramName)));
    // .catch(error => dispatch(getPlayerHistogramError(error, playerId, histogramName)));
};
