import fetch from 'isomorphic-fetch';
import {
  API_HOST,
} from 'config';
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
const SORT = 'playerMatches/SORT';

export const playerMatchesActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerMatchesSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerMatchesRequest = (id) => ({
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

const defaultOptions = {
  project: ['hero_id', 'start_time', 'duration', 'player_slot', 'radiant_win', 'game_mode', 'version', 'kills', 'deaths', 'assists', 'skill'],
};

export const getPlayerMatches = (playerId, options = {}, getAllData, host = API_HOST) => (dispatch, getState) => {
  const modifiedOptions = Object.assign({}, defaultOptions, options);
  // modifiedOptions.project = ['skill'].concat(modifiedOptions.project || []);
  if (playerMatches.isLoaded(getState(), playerId)) {
    dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId, getAllData));
    if (playerMatches.isMaxSize(getState(), playerId)) {
      return true;
    }
  } else {
    dispatch(getPlayerMatchesRequest(playerId));
  }
  return fetch(`${host}${getUrl(playerId, modifiedOptions, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId, getAllData)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
