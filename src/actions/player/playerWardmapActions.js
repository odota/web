/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerWardmap } from 'reducers';
import { getUrl } from 'actions/utility';

const url = playerId => `/api/players/${playerId}/wardmap`;

const REQUEST = 'playerWardmap/REQUEST';
const OK = 'playerWardmap/OK';
const ERROR = 'playerWardmap/ERROR';

export const playerWardmapActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerWardmapRequest = id => ({ type: REQUEST, id });

export const getPlayerWardmapOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerWardmapError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerWardmap = (playerId, options = {}) => (dispatch, getState) => {
  if (playerWardmap.isLoaded(getState(), playerId)) {
    dispatch(getPlayerWardmapOk(playerWardmap.getPlayerWardmap(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerWardmapRequest(playerId));
  }
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerWardmapOk(json, playerId)))
    .catch(error => dispatch(getPlayerWardmapError(error, playerId)));
};
