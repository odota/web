/* global API_HOST */
import fetch from 'isomorphic-fetch';

const url = '/api/request';

const START = 'request/START';
const ERROR = 'request/ERROR';
const OK = 'request/OK';
const PROGRESS = 'request/PROGRESS';

export const requestActions = {
  START,
  ERROR,
  OK,
  PROGRESS,
};

const requestStart = () => ({
  type: START,
});

const requestError = error => ({
  type: ERROR,
  error,
});

const requestOk = () => ({
  type: OK,
});

const requestProgress = progress => ({
  type: PROGRESS,
  progress,
});

function poll(dispatch, json, matchId) {
  fetch(`${API_HOST}${url}/${json.job.jobId}`)
  .then(res => res.json())
  .then((json) => {
    if (json.progress) {
      dispatch(requestProgress(json.progress));
    }
    if (json.err || json.state === 'failed') {
      dispatch(requestError(json.err || 'failed'));
    } else if (json.state === 'completed') {
      dispatch(requestOk());
      window.location.href = `/matches/${matchId}`;
    } else {
      setTimeout(poll, 2000, dispatch, { job: json }, matchId);
    }
  });
}

export const postRequest = matchId => (dispatch) => {
  dispatch(requestStart());
  return fetch(`${API_HOST}${url}/${matchId}`, { method: 'post' })
  .then(res => res.json())
  .then((json) => {
    if (json.job && json.job.jobId) {
      poll(dispatch, json, matchId);
    } else {
      dispatch(requestError(json.err));
    }
  })
  .catch(err => dispatch(requestError(err)));
};
