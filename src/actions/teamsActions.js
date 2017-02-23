/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  teams,
} from 'reducers';

const REQUEST = 'teams/REQUEST';
const OK = 'teams/OK';
const ERROR = 'teams/ERROR';

export const teamsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getTeamsRequest = () => ({
  type: REQUEST,
});

export const getTeamsOk = payload => ({
  type: OK,
  payload,
});

export const getTeamsError = payload => ({
  type: ERROR,
  payload,
});

export const getTeams = () => (dispatch, getState) => {
  if (teams.getLoaded(getState())) {
    return null;
  }
  dispatch(getTeamsRequest());

  return fetch(`${API_HOST}/api/teams`)
    .then(response => response.json())
    .then(json => dispatch(getTeamsOk(json)))
    .catch(error => dispatch(getTeamsError(error)));
};
