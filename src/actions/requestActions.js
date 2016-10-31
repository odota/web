/* global FormData API_HOST */
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

const url = '/api/request_job';

const REQUEST = 'request/REQUEST';
const ERROR = 'request/ERROR';
const PROGRESS = 'request/PROGRESS';
const MATCH_ID = 'request/MATCH_ID';

export const requestActions = {
  REQUEST,
  ERROR,
  PROGRESS,
  MATCH_ID,
};

const setMatchId = matchId => ({
  type: MATCH_ID,
  matchId,
});

const requestRequest = () => ({
  type: REQUEST,
});

const requestError = error => ({
  type: ERROR,
  error,
});

const requestProgress = progress => ({
  type: PROGRESS,
  progress,
});

function poll(dispatch, json, matchId) {
  fetch(`${API_HOST}${url}?id=${json.job.jobId}`)
  .then(res => res.json())
  .then((json) => {
    if (json.progress) {
      dispatch(requestProgress(json.progress));
    }
    if (json.error || json.state === 'failed') {
      dispatch(requestError(json.error || 'failed'));
    } else if (json.state === 'completed') {
      browserHistory.push(`/matches/${matchId}`);
    } else {
      setTimeout(poll, 2000, dispatch, { job: json }, matchId);
    }
  });
}

const requestSubmit = matchId => (dispatch) => {
  const formData = new FormData();
  formData.append('match_id', matchId);
  dispatch(requestRequest());
  return fetch(`${API_HOST}${url}`, {
    method: 'post',
    body: formData,
  })
  .then(res => res.json())
  .then((json) => {
    poll(dispatch, json, matchId);
  })
  .catch(err => dispatch(requestError(err)));
};

export {
  setMatchId,
  requestSubmit,
};
