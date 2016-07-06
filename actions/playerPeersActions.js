import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerPeers } from '../reducers';

const url = (playerId, numPeers) => `/api/players/${playerId}/peers${numPeers ? `?limit=${numPeers}` : ''}`;

const REQUEST = 'yasp/playerPeers/REQUEST';
const OK = 'yasp/playerPeers/OK';
const ERROR = 'yasp/playerPeers/ERROR';
const SORT = 'yasp/playerPeers/SORT';

export const playerPeersActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerPeersSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerPeersRequest = (id) => ({ type: REQUEST, id });

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

export const getPlayerPeers = (playerId, numPeers, host = HOST_URL) => (dispatch, getState) => {
  if (playerPeers.isLoaded(getState(), playerId)) {
    dispatch(getPlayerPeersOk(playerPeers.getPeerList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerPeersRequest(playerId));
  }
  return fetch(`${host}${url(playerId, numPeers)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerPeersOk(json, playerId)))
    .catch(error => dispatch(getPlayerPeersError(error, playerId)));
};
