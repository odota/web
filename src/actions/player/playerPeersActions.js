/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerPeers } from 'reducers';
import { getUrl } from 'actions/utility';

const url = playerId => `/api/players/${playerId}/peers`;

const REQUEST = 'playerPeers/REQUEST';
const OK = 'playerPeers/OK';
const ERROR = 'playerPeers/ERROR';

export const playerPeersActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerPeersRequest = id => ({ type: REQUEST, id });

export const getPlayerPeersOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerPeersError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerPeers = (playerId, options = {}) => (dispatch, getState) => {
  if (playerPeers.isLoaded(getState(), playerId)) {
    dispatch(getPlayerPeersOk(playerPeers.getPeerList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerPeersRequest(playerId));
  }
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerPeersOk(json, playerId)))
    .catch(error => dispatch(getPlayerPeersError(error, playerId)));
};
