/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerHeroes } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/heroes`;

const REQUEST = 'playerHeroes/REQUEST';
const OK = 'playerHeroes/OK';
const ERROR = 'playerHeroes/ERROR';

export const playerHeroesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerHeroesRequest = id => ({ type: REQUEST, id });

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

export const getPlayerHeroes = (playerId, options = {}) => (dispatch, getState) => {
  if (playerHeroes.isLoaded(getState(), playerId)) {
    dispatch(getPlayerHeroesOk(playerHeroes.getHeroList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerHeroesRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerHeroesOk(json, playerId)))
    .catch(error => dispatch(getPlayerHeroesError(error, playerId)));
};
