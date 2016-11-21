/* global API_HOST */
import fetch from 'isomorphic-fetch';

const url = '/api/rankings';

const REQUEST = 'ranking/REQUEST';
const OK = 'ranking/OK';
const ERROR = 'ranking/ERROR';

export const rankingActions = {
  REQUEST,
  OK,
  ERROR,
};

const getRankingStart = () => ({
  type: REQUEST,
});

const getRankingDone = payload => ({
  type: OK,
  payload,
});

const getRankingError = payload => ({
  type: ERROR,
  payload,
});

const getRanking = heroId => (dispatch) => {
  dispatch(getRankingStart());
  return fetch(`${API_HOST}${url}?hero_id=${heroId}`)
    .then(res => res.json())
    .then(json => dispatch(getRankingDone(json)))
    .catch(err => dispatch(getRankingError(err)));
};

export {
  getRanking,
};
