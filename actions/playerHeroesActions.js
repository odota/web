import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerHeroes } from '../reducers';
import { getUrl, addQueryString, defaultOptions, getModifiedOptions } from './utility';

const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/heroes`;

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

export const setPlayerHeroesSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerHeroesRequest = (id) => ({ type: REQUEST, id });

export const getPlayerHeroesOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerHeroesError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerHeroes = (playerId, options = defaultOptions, host = HOST_URL) => (dispatch, getState) => {
  if (playerHeroes.isLoaded(getState(), playerId)) {
    dispatch(getPlayerHeroesOk(playerHeroes.getHeroList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerHeroesRequest(playerId));
  }
  const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, addQueryString(modifiedOptions), url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerHeroesOk(json, playerId)))
    .catch(error => dispatch(getPlayerHeroesError(error, playerId)));
};
