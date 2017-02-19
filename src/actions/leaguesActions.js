/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  leagues,
} from 'reducers';

const REQUEST = 'leagues/REQUEST';
const OK = 'leagues/OK';
const ERROR = 'leagues/ERROR';

export const leaguesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getLeaguesRequest = () => ({
  type: REQUEST,
});

export const getLeaguesOk = payload => ({
  type: OK,
  payload,
});

export const getLeaguesError = payload => ({
  type: ERROR,
  payload,
});

export const getLeagues = () => (dispatch, getState) => {
  if (leagues.getLoaded(getState())) {
    return null;
    // dispatch(getleaguesOk(leagues.getList(getState())));
  }
  dispatch(getLeaguesRequest());

  return fetch(`${API_HOST}/api/leagues`)
    .then(response => response.json())
    .then(json => dispatch(getLeaguesOk(json)))
    .catch(error => dispatch(getLeaguesError(error)));
};
