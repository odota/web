import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/request_job';

const START = 'yasp/request/START';
const ERROR = 'yasp/request/ERROR';
const PROGRESS = 'yasp/request/PROGRESS';
const MATCH_ID = 'yasp/request/MATCH_ID';

export const requestActions = {
  START,
  ERROR,
  PROGRESS,
  MATCH_ID,
};

const setMatchId = (matchId) => ({
  type: MATCH_ID,
  matchId,
});

const requestStart = () => ({
  type: START,
});

const requestError = (error) => ({
  type: ERROR,
  error,
});

const requestProgress = (progress) => ({
  type: PROGRESS,
  progress,
});

const requestSubmit = (matchId) => (dispatch) => {
  const formData = new FormData();
  formData.append('match_id', matchId);
  dispatch(requestStart());
  return fetch(`${API_HOST}${url}`, {
    method: 'post',
    body: formData,
  })
  .then(res => res.json())
  .then((json) => {
    function poll() {
      fetch(`${API_HOST}${url}?id=${json.job.jobId}`)
      .then(res => res.json())
      .then((json) => {
        if (json.progress) {
          dispatch(requestProgress(json.progress));
        }
        if (json.error || json.state === 'failed') {
          dispatch(requestError(json.error || 'failed'));
        } else if (json.state === 'completed') {
          window.location.href = `/matches/${matchId}`;
        } else {
          setTimeout(poll, 2000);
        }
      });
    }
    poll();
  })
  .catch(err => dispatch(requestError(err)));
};

export {
  setMatchId,
  requestSubmit,
};
