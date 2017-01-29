import fetch from 'isomorphic-fetch';

const url = '/yasp';
const pvgnaHost = 'https://yasp.pvgna.com';

const REQUEST = 'pvgnaGuides/REQUEST';
const OK = 'pvgnaGuides/OK';
const ERROR = 'pvgnaGuides/ERROR';

export const pvgnaActions = {
  REQUEST,
  OK,
  ERROR,
};

const getGuidesStart = () => ({
  type: REQUEST,
});

const getGuidesDone = payload => ({
  type: OK,
  payload,
});

const getGuidesError = payload => ({
  type: ERROR,
  payload,
});

const getPvgnaHeroGuides = () => (dispatch) => {
  dispatch(getGuidesStart());
  return fetch(`${pvgnaHost}${url}`)
    .then(res => res.json())
    .then(json => dispatch(getGuidesDone(json)))
    .catch(err => dispatch(getGuidesError(err)));
};

export {
  getPvgnaHeroGuides,
};
