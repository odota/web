import fetch from 'isomorphic-fetch';
import { HOST_URL } from '.';

const url = '/api/players';

const REQUEST = 'yasp/player/REQUEST';
const OK = 'yasp/player/OK';
const ERROR = 'yasp/player/ERROR';

export const playerActions = {
  REQUEST,
  OK,
  ERROR,
};

const getPlayerRequest = (id) => ({ type: REQUEST, id });

const getPlayerOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

const getPlayerError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayer = (accountId, isUser, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerRequest());
  return fetch(`${host}${url}/${accountId}`)
    .then(response => response.json(accountId))
    .then(json => {
      dispatch(getPlayerOk(json, accountId));
    })
    .catch(error => {
      dispatch(getPlayerError(error, accountId));
    });
};
