/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerPros } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/pros`;

const REQUEST = 'playerPros/REQUEST';
const OK = 'playerPros/OK';
const ERROR = 'playerPros/ERROR';

export const playerProsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerProsRequest = id => ({ type: REQUEST, id });

export const getPlayerProsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerProsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerPros = (playerId, options = {}) => (dispatch, getState) => {
  if (playerPros.isLoaded(getState(), playerId)) {
    dispatch(getPlayerProsOk(playerPros.getProsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerProsRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => json.filter(pro => Number(playerId) !== pro.account_id))
    .then(json => dispatch(getPlayerProsOk(json, playerId)))
    .catch(error => dispatch(getPlayerProsError(error, playerId)));
};
