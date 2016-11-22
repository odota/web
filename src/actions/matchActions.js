/* global API_HOST */
import fetch from 'isomorphic-fetch';
import renderMatch from 'components/Match/renderMatch';

const url = '/api/matches/';

const REQUEST = 'match/REQUEST';
const OK = 'match/OK';
const ERROR = 'match/ERROR';
const SORT = 'match/SORT';

export const matchActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

const getMatchRequest = () => ({ type: REQUEST });

const getMatchOk = payload => ({
  type: OK,
  payload,
});

const getMatchError = payload => ({
  type: ERROR,
  payload,
});

export const setMatchSort = (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
});

export const getMatch = matchId => (dispatch) => {
  dispatch(getMatchRequest());
  return fetch(`${API_HOST}${url}${matchId}`)
    .then(response => response.json())
    .then(json => renderMatch(json))
    .then(json => dispatch(getMatchOk(json)))
    .catch(error => dispatch(getMatchError(error)));
};
