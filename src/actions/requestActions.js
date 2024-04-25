import config from '../config';

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
  fetch(`${config.VITE_API_HOST}${url}/${json.job.jobId}`)
    .then(res => res.json())
    .then((_json) => {
      if (_json && _json.progress) {
        dispatch(requestProgress(_json.progress));
      }
      if (!_json || _json.state === 'completed') {
        dispatch(requestOk());
        window.location.href = `/matches/${matchId}`;
      } else {
        setTimeout(poll, 5000, dispatch, { job: _json }, matchId);
      }
    });
}

export const postRequest = matchId => (dispatch) => {
  dispatch(requestStart());
  return fetch(`${config.VITE_API_HOST}${url}/${matchId}`, { method: 'post' })
    .then(res => res.json())
    .then((json) => {
      if (json.job && json.job.jobId) {
        poll(dispatch, json, matchId);
      } else if (json.job && !json.job.jobId) {
        // No parse job created so just go to the page
        window.location.href = `/matches/${matchId}`;
      } else {
        dispatch(requestError(json.err));
      }
    })
    .catch(err => dispatch(requestError(err)));
};
