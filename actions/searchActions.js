import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/search';

const START = 'yasp/search/START';
const DONE = 'yasp/search/DONE';
const ERROR = 'yasp/search/ERROR';
const QUERY = 'yasp/search/QUERY';

export const searchActions = {
  START,
  DONE,
  ERROR,
  QUERY,
};

const setSearchQuery = (query) => ({
  type: QUERY,
  query,
});

const getSearchStart = () => ({
  type: START,
});

const getSearchDone = (payload) => ({
  type: DONE,
  payload,
});

const getSearchError = (payload) => ({
  type: ERROR,
  payload,
});

const getSearchResult = (query) => (dispatch) => {
  dispatch(getSearchStart());
  dispatch(setSearchQuery(query));
  return fetch(`${API_HOST}${url}?q=${query}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchDone(json)))
    .catch(err => dispatch(getSearchError(err)));
};

export {
  getSearchResult,
  setSearchQuery,
};
