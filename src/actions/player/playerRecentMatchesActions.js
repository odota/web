/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  getUrl,
} from 'actions/utility';

const url = playerId => `/api/players/${playerId}/recentMatches`;

const REQUEST = 'playerRecentMatches/REQUEST';
const OK = 'playerRecentMatches/OK';
const ERROR = 'playerRecentMatches/ERROR';

export const playerRecentMatchesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerRecentMatchesRequest = id => ({
  type: REQUEST,
  id,
});

export const getPlayerRecentMatchesOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerRecentMatchesError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerRecentMatches = (playerId, options = {}) => (dispatch) => {
  dispatch(getPlayerRecentMatchesRequest(playerId));
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerRecentMatchesOk(json, playerId)))
    .catch(error => dispatch(getPlayerRecentMatchesError(error, playerId)));
};
