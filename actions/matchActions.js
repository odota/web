import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/matches/';

const REQUEST = 'yasp/match/REQUEST';
const OK = 'yasp/match/OK';
const ERROR = 'yasp/match/ERROR';
const SORT = 'yasp/match/SORT';

export const matchActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

const getMatchRequest = () => ({ type: REQUEST });

const getMatchOk = (payload) => ({
  type: OK,
  payload,
});

const getMatchError = (payload) => ({
  type: ERROR,
  payload,
});


export const setMatchSort = (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
});

export const getMatch = (matchId) => (dispatch) => {
  dispatch(getMatchRequest());
  return fetch(`${API_HOST}${url}${matchId}`)
    .then(response => response.json())
    .then(json => dispatch(getMatchOk(json)))
    .catch(error => dispatch(getMatchError(error)));
};
