/* global API_HOST */
import fetch from 'isomorphic-fetch';

const REQUEST = 'proMatches/REQUEST';
const OK = 'proMatches/OK';
const ERROR = 'proMatches/ERROR';

export const proMatchesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getProMatchesRequest = () => ({
  type: REQUEST,
});

export const getProMatchesOk = payload => ({
  type: OK,
  payload,
});

export const getProMatchesError = payload => ({
  type: ERROR,
  payload,
});

export const getProMatches = () => (dispatch) => {
  dispatch(getProMatchesRequest());
  return fetch(`${API_HOST}/api/proMatches`)
    .then(response => response.json())
    .then(json => dispatch(getProMatchesOk(json)))
    .catch(error => dispatch(getProMatchesError(error)));
};
