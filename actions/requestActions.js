import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';

const url = '/api/request_job';

const START = 'yasp/request/START';
const DONE = 'yasp/request/DONE';
const ERROR = 'yasp/request/ERROR';
const PROGRESS = 'yasp/request/PROGRESS';
const MATCH_ID = 'yasp/request/MATCH_ID';

export const searchActions = {
  START,
  ERROR,
  PROGRESS,
  MATCH_ID,
};

const setMatchId = (match_id) => ({
  type: MATCH_ID,
  match_id
});

const requestStart = () => ({
  type: START,
});

const requestError = (payload) => ({
  type: ERROR,
  payload,
});

const requestProgress = (progress) => ({
  type: PROGRESS,
  progress,
});

const requestSubmit = (query) => (dispatch) => {
  dispatch(requestStart());
  return fetch(`${API_HOST}${url}`, {
    method: 'post',
    headers:
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      match_id: query.match_id,
      replay_blob: query.replay_blob,
    }),
  })
  .then(res => res.json())
  .then((json) => {
     function poll(){
       fetch(`${API_HOST}${url}?id=${json.job.id}`)
       .then(res => res.json())
       .then((json) => {
         if (json.progress) {
           dispatch(requestProgress(json.progress));
         }
         if (json.error) {
           dispatch(requestError(json.error));
         } else if (json.state === 'completed') {
           window.pushState(`/matches/${query.match_id}`);
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
