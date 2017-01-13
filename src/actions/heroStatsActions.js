/* global API_HOST */
import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const REQUEST = 'heroStats/REQUEST';
const OK = 'heroStats/OK';
const ERROR = 'heroStats/ERROR';

export const heroStatsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getHeroStatsRequest = () => ({
  type: REQUEST,
});

export const getHeroStatsOk = payload => ({
  type: OK,
  payload,
});

export const getHeroStatsError = payload => ({
  type: ERROR,
  payload,
});

export const getHeroStats = (options = {}) => (dispatch) => {
  dispatch(getHeroStatsRequest());
  return fetch(`${API_HOST}/api/heroStats?${querystring.stringify(options)}`)
    .then(response => response.json())
    .then(json => dispatch(getHeroStatsOk(json)))
    .catch(error => dispatch(getHeroStatsError(error)));
};
