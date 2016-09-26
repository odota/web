import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import { playerHistogram } from 'reducers';
import { getUrl } from 'actions/utility';

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

const reduceArray = backwards => (array, val) => {
  if (array.length !== 0 || val.games !== 0) {
    if (backwards) {
      array.unshift(val)
    } else {
      array.push(val);
    }
  }
  return array;
};

export const getPlayerHistogram = (playerId, histogramName, host = API_HOST) => (dispatch, getState) => {
  if (playerHistogram.isLoaded(getState(), playerId, histogramName)) {
    dispatch(getPlayerHistogramOk(
      playerHistogram.getHistogramList(histogramName)(getState(), playerId),
      playerId,
      histogramName
    ));
  } else {
    dispatch(getPlayerHistogramRequest(playerId, histogramName));
  }

  return fetch(`${host}${getUrl(playerId, null, url(histogramName))}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => json.reduceRight(reduceArray(true), []))
    .then(json => json.reduce(reduceArray(), []))
    .then(json => dispatch(getPlayerHistogramOk(json, playerId, histogramName)))
    .catch(error => dispatch(getPlayerHistogramError(error, playerId, histogramName)));
};
