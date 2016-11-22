/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { getUrl } from 'actions/utility';

const url = playerId => `/api/players/${playerId}/wl`;

const REQUEST = 'playerWinLoss/REQUEST';
const OK = 'playerWinLoss/OK';
const ERROR = 'playerWinLoss/ERROR';

export const playerWinLossActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerWinLossRequest = () => ({ type: REQUEST });

export const getPlayerWinLossOk = payload => ({
  type: OK,
  payload,
});

export const getPlayerWinLossError = payload => ({
  type: ERROR,
  payload,
});

export const getPlayerWinLoss = (playerId, options = {}) => (dispatch) => {
  dispatch(getPlayerWinLossRequest());
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerWinLossOk(json)))
    .catch(error => dispatch(getPlayerWinLossError(error)));
};
