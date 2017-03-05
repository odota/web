/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  playerMatches,
} from 'reducers';
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

export const getPlayerMatchesOk = (payload, id, maxSize) => ({
  type: OK,
  payload,
  id,
  maxSize,
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

export const getPlayerMatches = (playerId, options = {}, getAllData, forceRefresh) => (dispatch, getState) => {
  const modifiedOptions = {
    ...defaultPlayerMatchesOptions,
    ...options,
  };

  if (playerMatches.isLoaded(getState(), playerId)) {
    if (playerMatches.isMaxSize(getState(), playerId) && !forceRefresh) {
      return dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId, getAllData));
    }
    dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId, false));
  } else {
    dispatch(getPlayerMatchesRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, modifiedOptions, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId, getAllData)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
