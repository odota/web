import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';

const url = (playerId, queryString) => `/api/players/${playerId}/heroes?${queryString}`;

const REQUEST = 'yasp/playerHeroes/REQUEST';
const OK = 'yasp/playerHeroes/OK';
const ERROR = 'yasp/playerHeroes/ERROR';
const SORT = 'yasp/playerHeroes/SORT';

export const playerHeroesActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerHeroesSort = (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
});

export const getPlayerHeroesRequest = () => ({ type: REQUEST });

export const getPlayerHeroesOk = (payload) => ({
  type: OK,
  payload,
});

export const getPlayerHeroesError = (payload) => ({
  type: ERROR,
  payload,
});

export const getPlayerHeroes = (playerId, numMatches, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerHeroesRequest());
  return fetch(`${host}${url(playerId, numMatches)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerHeroesOk(json.slice(0, 10))))
    .catch(error => dispatch(getPlayerHeroesError(error)));
};
