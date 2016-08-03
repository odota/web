import fetch from 'isomorphic-fetch';
import { API_HOST } from './../actions';

const url = '/api/benchmarks';

const START = 'yasp/benchmark/START';
const DONE = 'yasp/benchmark/DONE';
const ERROR = 'yasp/benchmark/ERROR';

export const benchmarkActions = {
  START,
  DONE,
  ERROR,
};

const getBenchmarkStart = () => ({
  type: START,
});

const getBenchmarkDone = (payload) => ({
  type: DONE,
  payload,
});

const getBenchmarkError = (payload) => ({
  type: ERROR,
  payload,
});

const getBenchmark = (heroId) => (dispatch) => {
  dispatch(getBenchmarkStart());
  return fetch(`${API_HOST}${url}?hero_id=${heroId}`)
    .then(res => res.json())
    .then(json => dispatch(getBenchmarkDone(json)))
    .catch(err => dispatch(getBenchmarkError(err)));
};

export {
  getBenchmark,
};
