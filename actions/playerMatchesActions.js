import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerMatches } from '../reducers';
import { getUrl, defaultOptions } from './utility';

const url = playerId => `/api/players/${playerId}/matches`;

const REQUEST = 'yasp/playerMatches/REQUEST';
const OK = 'yasp/playerMatches/OK';
const ERROR = 'yasp/playerMatches/ERROR';
const SORT = 'yasp/playerMatches/SORT';

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

export const getPlayerMatchesRequest = (id) => ({ type: REQUEST, id });

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

export const getPlayerMatches = (playerId, options = defaultOptions, host = HOST_URL) => (dispatch, getState) => {
  if (playerMatches.isLoaded(getState(), playerId)) {
    dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerMatchesRequest(playerId));
  }
  // TODO for some reason this breaks the match table, maybe it's trying to map the property to a nonexistent form element?
  // options.project = options.project.concat(['skill']);
  return fetch(`${host}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
