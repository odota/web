import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';

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

export const getPlayerWinLoss = playerId => (dispatch) => {
  dispatch(getPlayerWinLossRequest());
  return fetch(`${API_HOST}${url(playerId)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerWinLossOk(json)))
    .catch(error => dispatch(getPlayerWinLossError(error)));
};
