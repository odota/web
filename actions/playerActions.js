import fetch from 'isomorphic-fetch';
import { HOST_URL } from '.';
import { getPlayerMatchesOk, getPlayerMatchesRequest, getPlayerMatchesError } from './playerMatchesActions';

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
  dispatch(getPlayerMatchesRequest());
  return fetch(`${host}${url}/${accountId}`)
    .then(response => response.json())
    .then(json => {
      const { matches, ...playerData } = json;
      dispatch(getPlayerOk(playerData));
      dispatch(getPlayerMatchesOk(matches));
    })
    .catch(error => {
      dispatch(getPlayerError(error));
      dispatch(getPlayerMatchesError(error));
    });
};
