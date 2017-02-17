/* global API_HOST */
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const REQUEST = 'publicMatches/REQUEST';
const OK = 'publicMatches/OK';
const ERROR = 'publicMatches/ERROR';

export const publicMatchesActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPublicMatchesRequest = () => ({
  type: REQUEST,
});

export const getPublicMatchesOk = payload => ({
  type: OK,
  payload,
});

export const getPublicMatchesError = payload => ({
  type: ERROR,
  payload,
});

export const getPublicMatches = options => (dispatch) => {
  dispatch(getPublicMatchesRequest());
  return fetch(`${API_HOST}/api/publicMatches?${querystring.stringify(options)}`)
    .then(response => response.json())
    .then(json => dispatch(getPublicMatchesOk(json)))
    .catch(error => dispatch(getPublicMatchesError(error)));
};
