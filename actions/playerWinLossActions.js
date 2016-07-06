import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';

const url = (playerId) => `/api/players/${playerId}/wl`;

const REQUEST = 'yasp/playerWinLoss/REQUEST';
const OK = 'yasp/playerWinLoss/OK';
const ERROR = 'yasp/playerWinLoss/ERROR';

export const playerWinLossActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerWinLossRequest = () => ({ type: REQUEST });

export const getPlayerWinLossOk = (payload) => ({
  type: OK,
  payload,
});

export const getPlayerWinLossError = (payload) => ({
  type: ERROR,
  payload,
});

export const getPlayerWinLoss = (playerId, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerWinLossRequest());
  return fetch(`${host}${url(playerId)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerWinLossOk(json)))
    .catch(error => dispatch(getPlayerWinLossError(error)));
};
