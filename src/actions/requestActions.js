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
  fetch(`${process.env.REACT_APP_API_HOST}${url}/${json.job.jobId}`)
    .then(res => res.json())
    .then((_json) => {
      if (_json && _json.progress) {
        dispatch(requestProgress(_json.progress));
      }
      if (!_json || (_json && _json.state === 'completed')) {
        dispatch(requestOk());
        window.location.href = `/matches/${matchId}`;
      } else {
        setTimeout(poll, 2000, dispatch, { job: _json }, matchId);
      }
    });
}

export const postRequest = matchId => (dispatch) => {
  dispatch(requestStart());
  return fetch(`${process.env.REACT_APP_API_HOST}${url}/${matchId}`, { method: 'post' })
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
