import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerMatches } from '../reducers';
import { addQueryString } from '../utility';

const url = playerId => `/api/players/${playerId}/matches`;
const getUrl = (playerId, options) =>
  `${url(playerId)}${options.reduce((previous, current) =>
    current.values.reduce((total, value) => `${previous}${current.queryParam}=${value}&`, ''), '?')}`;

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

// export const getPlayerMatches = (playerId, numMatches, host = HOST_URL) => (dispatch, getState) => {
//   if (playerMatches.isLoaded(getState(), playerId)) {
//     dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId));
//   } else {
//     dispatch(getPlayerMatchesRequest(playerId));
//   }
//   return fetch(`${host}${getUrl(playerId, numMatches)}`, { credentials: 'include' })
//     .then(response => response.json())
//     .then(json => dispatch(getPlayerMatchesOk(json, playerId)))
//     .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
// };

const defaultOptions = {
  limit: {
    values: [
      20,
    ],
  },
};

export const getPlayerMatches = (playerId, options = defaultOptions, host = HOST_URL) => (dispatch, getState) => {
  if (playerMatches.isLoaded(getState(), playerId)) {
    dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerMatchesRequest(playerId));
  }
  return fetch(`${host}${getUrl(playerId, addQueryString(options))}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
