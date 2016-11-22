/* global API_HOST */
import fetch from 'isomorphic-fetch';

const url = '/api/benchmarks';

const REQUEST = 'benchmark/REQUEST';
const OK = 'benchmark/OK';
const ERROR = 'benchmark/ERROR';

export const benchmarkActions = {
  REQUEST,
  OK,
  ERROR,
};

const getBenchmarkStart = () => ({
  type: REQUEST,
});

const getBenchmarkDone = payload => ({
  type: OK,
  payload,
});

const getBenchmarkError = payload => ({
  type: ERROR,
  payload,
});

const getBenchmark = heroId => (dispatch) => {
  dispatch(getBenchmarkStart());
  return fetch(`${API_HOST}${url}?hero_id=${heroId}`)
    .then(res => res.json())
    .then(json => dispatch(getBenchmarkDone(json)))
    .catch(err => dispatch(getBenchmarkError(err)));
};

export {
  getBenchmark,
};
