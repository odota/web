/* global API_HOST */
import fetch from 'isomorphic-fetch';

const url = '/api/distributions';

const REQUEST = 'distributions/REQUEST';
const OK = 'distributions/OK';
const ERROR = 'distributions/ERROR';

export const distributionsActions = {
  REQUEST,
  OK,
  ERROR,
};

const getDistributionsRequest = () => ({
  type: REQUEST,
});

const getDistributionsOk = payload => ({
  type: OK,
  payload,
});

const getDistributionsError = payload => ({
  type: ERROR,
  payload,
});

const getDistributions = () => (dispatch) => {
  dispatch(getDistributionsRequest());
  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then(json => dispatch(getDistributionsOk(json)))
    .catch(err => dispatch(getDistributionsError(err)));
};

export {
  getDistributions,
};
