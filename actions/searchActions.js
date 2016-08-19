import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/search';

const REQUEST = 'yasp/search/REQUEST';
const OK = 'yasp/search/OK';
const ERROR = 'yasp/search/ERROR';
const QUERY = 'yasp/search/QUERY';

export const searchActions = {
  REQUEST,
  OK,
  ERROR,
  QUERY,
};

const setSearchQuery = (query) => ({
  type: QUERY,
  query,
});

const getSearchRequest = () => ({
  type: REQUEST,
});

const getSearchOk = (payload) => ({
  type: OK,
  payload,
});

const getSearchError = (payload) => ({
  type: ERROR,
  payload,
});

const getSearchResult = (query) => (dispatch) => {
  dispatch(getSearchRequest());
  dispatch(setSearchQuery(query));
  return fetch(`${API_HOST}${url}?q=${query}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchOk(json)))
    .catch(err => dispatch(getSearchError(err)));
};

export {
  getSearchResult,
  setSearchQuery,
};
