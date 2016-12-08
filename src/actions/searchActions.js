/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { getProPlayers } from 'actions/proPlayersActions';

const url = '/api/search';

const REQUEST = 'search/REQUEST';
const OK = 'search/OK';
const ERROR = 'search/ERROR';
const QUERY = 'search/QUERY';

export const searchActions = {
  REQUEST,
  OK,
  ERROR,
  QUERY,
};

const setSearchQuery = query => ({
  type: QUERY,
  query,
});

const getSearchRequest = () => ({
  type: REQUEST,
});

const getSearchOk = payload => ({
  type: OK,
  payload,
});

const getSearchError = payload => ({
  type: ERROR,
  payload,
});

const getSearchResult = query => (dispatch) => {
  dispatch(getSearchRequest());
  dispatch(setSearchQuery(query));
  return fetch(`${API_HOST}${url}?q=${query}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchOk(json)))
    .catch(err => dispatch(getSearchError(err)));
};

export const getSearchResultAndPros = query =>
  dispatch => Promise.all([
    dispatch(getSearchResult(query)),
    dispatch(getProPlayers()),
  ]);

export {
  getSearchResult,
  setSearchQuery,
};
