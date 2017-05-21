/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerTotals } from 'reducers';
import { getUrl } from 'actions/utility';

const url = playerId => `/api/players/${playerId}/totals`;

const REQUEST = 'playerTotals/REQUEST';
const OK = 'playerTotals/OK';
const ERROR = 'playerTotals/ERROR';

export const playerTotalsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerTotalsRequest = id => ({ type: REQUEST, id });

export const getPlayerTotalsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerTotalsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerTotals = (playerId, options = {}) => (dispatch, getState) => {
  if (playerTotals.isLoaded(getState(), playerId)) {
    dispatch(getPlayerTotalsOk(playerTotals.getTotalsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerTotalsRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerTotalsOk(json, playerId)))
    .catch(error => dispatch(getPlayerTotalsError(error, playerId)));
};
