/* global API_HOST */
import fetch from 'isomorphic-fetch';
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

export const getPlayerHistogramRequest = (id, name) => ({ type: REQUEST, id, name });

export const getPlayerHistogramOk = (list, id, name) => ({
  type: OK,
  payload: {
    list,
  },
  name,
  id,
});

export const getPlayerHistogramError = (payload, id, name) => ({
  type: ERROR,
  payload,
  name,
  id,
});

const reduceArray = backwards => (array, val) => {
  if (array.length !== 0 || val.games !== 0) {
    if (backwards) {
      array.unshift(val);
    } else {
      array.push(val);
    }
  }
  return array;
};

export const getPlayerHistogram = (playerId, options = {}, histogramName) => (dispatch, getState) => {
  if (playerHistogram.isLoaded(histogramName)(getState(), playerId)) {
    const list = playerHistogram.getHistogramList(histogramName)(getState(), playerId);
    dispatch(getPlayerHistogramOk(
      list,
      playerId,
      histogramName,
    ));
  } else {
    dispatch(getPlayerHistogramRequest(playerId, histogramName));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url(histogramName))}`)
    .then(response => response.json())
    .then(json => json.reduceRight(reduceArray(true), []))
    .then(json => dispatch(getPlayerHistogramOk(json, playerId, histogramName)))
    .catch(error => dispatch(getPlayerHistogramError(error, playerId, histogramName)));
};
