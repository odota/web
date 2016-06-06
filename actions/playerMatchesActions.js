import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';

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

export const getPlayerMatchesRequest = () => ({ type: REQUEST });

export const getPlayerMatchesOk = (payload) => ({
  type: OK,
  payload,
});

export const getPlayerMatchesError = (payload) => ({
  type: ERROR,
  payload,
});

export const getPlayerMatches = (playerId, numMatches, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerMatchesRequest());
  return fetch(`${host}${url(playerId, numMatches)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerMatchesOk(json.matches)))
    .catch(error => {
      console.error(error);
      return dispatch(getPlayerMatchesError(error));
    });
};
