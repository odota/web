/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  proPlayers,
} from 'reducers';

const REQUEST = 'proPlayers/REQUEST';
const OK = 'proPlayers/OK';
const ERROR = 'proPlayers/ERROR';

export const proPlayersActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getProPlayersRequest = () => ({
  type: REQUEST,
});

export const getProPlayersOk = payload => ({
  type: OK,
  payload,
});

export const getProPlayersError = payload => ({
  type: ERROR,
  payload,
});

export const getProPlayers = () => (dispatch, getState) => {
  if (proPlayers.getLoaded(getState())) {
    return null;
    // dispatch(getProPlayersOk(proPlayers.getList(getState())));
  }
  dispatch(getProPlayersRequest());

  return fetch(`${API_HOST}/api/proPlayers`)
    .then(response => response.json())
    .then(json => dispatch(getProPlayersOk(json)))
    .catch(error => dispatch(getProPlayersError(error)));
};
