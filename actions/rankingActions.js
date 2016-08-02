import fetch from 'isomorphic-fetch';
import { API_HOST } from './../actions';

const url = '/api/rankings';

const START = 'yasp/ranking/START';
const DONE = 'yasp/ranking/DONE';
const ERROR = 'yasp/ranking/ERROR';

export const rankingActions = {
  START,
  DONE,
  ERROR,
};

const getRankingStart = () => ({
  type: START,
});

const getRankingDone = (payload) => ({
  type: DONE,
  payload,
});

const getRankingError = (payload) => ({
  type: ERROR,
  payload,
});

const getRanking = (hero_id) => (dispatch) => {
  dispatch(getRankingStart())
  return fetch(`${API_HOST}${url}?hero_id=${hero_id}`)
    .then(res => res.json())
    .then(json => dispatch(getRankingDone(json)))
    .catch(err => dispatch(getRankingError(err)));
}

export {
  getRanking
};
