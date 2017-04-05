/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  getUrl,
} from 'actions/utility';

const url = playerId => `/api/players/${playerId}/matches`;

const REQUEST = 'playerMatches/REQUEST';
const OK = 'playerMatches/OK';
const ERROR = 'playerMatches/ERROR';

export const playerMatchesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerMatchesRequest = id => ({
  type: REQUEST,
  id,
});

export const getPlayerMatchesOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerMatchesError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const defaultPlayerMatchesOptions = {
  project: [
    'hero_id',
    'start_time',
    'duration',
    'player_slot',
    'radiant_win',
    'game_mode',
    'lobby_type',
    'version',
    'kills',
    'deaths',
    'assists',
    'skill',
  ],
};

export const getPlayerMatches = (playerId, options = {}) => (dispatch) => {
  const modifiedOptions = {
    ...defaultPlayerMatchesOptions,
    ...options,
  };
  dispatch(getPlayerMatchesRequest(playerId));
  return fetch(`${API_HOST}${getUrl(playerId, modifiedOptions, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
