import fetch from 'isomorphic-fetch';
import { HOST_URL } from '.';
import { getPlayerMatchesOk, getPlayerMatchesRequest, getPlayerMatchesError } from './playerMatchesActions';
import { getPlayerHeroesOk, getPlayerHeroesRequest, getPlayerHeroesError } from './playerHeroesActions';

const url = '/api/players';

const REQUEST = 'yasp/player/REQUEST';
const OK = 'yasp/player/OK';
const ERROR = 'yasp/player/ERROR';

export const playerActions = {
  REQUEST,
  OK,
  ERROR,
};

const getPlayerRequest = () => ({ type: REQUEST });

const getPlayerOk = (payload) => ({
  type: OK,
  payload,
});

const getPlayerError = (payload) => ({
  type: ERROR,
  payload,
});

export const getPlayer = (accountId, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerRequest());
  return fetch(`${host}${url}/${accountId}`)
    .then(response => response.json())
    .then(json => {
      dispatch(getPlayerOk(json));
    })
    .catch(error => {
      dispatch(getPlayerError(error));
    });
};
