import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerMatches } from '../reducers';

const url = (playerId, numMatches) => `/api/players/${playerId}/matches?limit=${numMatches}`;

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

export const setPlayerMatchesSort = (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
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

export const getPlayerMatches = (playerId, numMatches, host = HOST_URL) => (dispatch, getState) => {
  if (playerMatches.isLoaded(getState(), playerId)) {
    dispatch(getPlayerMatchesOk(playerMatches.getMatchList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerMatchesRequest(playerId));
  }
  return fetch(`${host}${url(playerId, numMatches)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json, playerId)))
    .catch(error => dispatch(getPlayerMatchesError(error, playerId)));
};
