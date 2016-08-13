import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/distributions';

const START = 'yasp/distributions/START';
const DONE = 'yasp/distributions/DONE';
const ERROR = 'yasp/distributions/ERROR';

export const distributionsActions = {
  START,
  DONE,
  ERROR,
};

const getDistributionsStart = () => ({
  type: START,
});

const getDistributionsDone = (payload) => ({
  type: DONE,
  payload,
});

const getDistributionsError = (payload) => ({
  type: ERROR,
  payload,
});

const getDistributions = () => (dispatch) => {
  dispatch(getDistributionsStart());
  return fetch(`${API_HOST}${url}`)
    .then(res => res.json())
    .then(json => dispatch(getDistributionsDone(json)))
    .catch(err => dispatch(getDistributionsError(err)));
};

export {
  getDistributions,
};
