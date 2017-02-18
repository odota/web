import fetch from 'isomorphic-fetch';
import querystring from 'querystring';

const REQUEST = 'gh/REQUEST';
const OK = 'gh/OK';
const ERROR = 'gh/ERROR';

export const githubPullsActions = {
  REQUEST,
  OK,
  ERROR,
};

const getGithubPullsRequest = () => ({
  type: REQUEST,
});

const getGithubPullsOk = payload => ({
  type: OK,
  payload,
});

const getGithubPullsError = payload => ({
  type: ERROR,
  payload,
});

const getGithubPulls = repo => (dispatch) => {
  const host = 'https://api.github.com';

  const params = querystring.stringify({
    base: repo === 'ui' ? 'production' : 'master',
    head: repo === 'ui' ? 'master' : '',
    state: 'closed',
    direction: 'desc',
    per_page: 1,
  });

  dispatch(getGithubPullsRequest());
  return fetch(`${host}/repos/odota/${repo}/pulls?${params}`)
    .then(res => res.json())
    .then(json => dispatch(getGithubPullsOk(json)))
    .catch(err => dispatch(getGithubPullsError(err)));
};

export {
  getGithubPulls,
};
