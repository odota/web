import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../actions';

const url = '/api/search';

const START = 'yasp/search/START';
const DONE = 'yasp/search/DONE';
const ERROR = 'yasp/search/ERROR';

export const searchActions = {
  START,
  DONE,
  ERROR,
};

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

export const getSearchResult = (query) => (dispatch) => {
  dispatch(getSearchStart());

  return fetch(`${HOST_URL}${url}?q=${query}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchDone(json)))
    .catch(err => dispatch(getSearchError(err)));
};
