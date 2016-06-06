import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../actions';

const url = '/api/search';

const REQUEST = 'yasp/search/REQUEST';
const OK = 'yasp/search/OK';
const ERROR = 'yasp/match/ERROR';

export const searchActions = {
  REQUEST,
  OK,
  ERROR,
};


const getSearchRequest = () => ({
  type: REQUEST,
});

const getSearchOk = (payload) => ({
  type: OK,
  payload,
});

const getSearchError = (payload) => ({
  type : ERROR,
  payload
});

export const getSearchResult = (query) => (dispatch) => {
  dispatch(getSearchRequest())

  return fetch(`${HOST_URL}${url}?q=${query}`)
    .then(res => res.json())
    .then(json => dispatch(getSearchOk(json)))
    .catch(err => dispatch(getMatchError(err)));
};
