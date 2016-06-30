import fetch from 'isomorphic-fetch';
import { HOST_URL } from '.';
import { player } from '../reducers';

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

export const getPlayer = (accountId, isUser, host = HOST_URL) => (dispatch, getState) => {
  // we are checking to see if the player object exists here. This is a hacky way of doing that
  // since we have default values, we can't just check if it's undefined. We need to see if the profile
  // is empty (that's something that has no default values inside it in the reducer).
  const requestedPlayer = player.getProfile(getState(), accountId);
  if (Object.keys(requestedPlayer).length > 0) {
    return dispatch(getPlayerOk(player.getPlayer(getState(), accountId), accountId));
  }
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
