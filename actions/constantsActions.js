import fetch from 'isomorphic-fetch';
import { API_HOST } from '../actions';
const url = '/api/constants';
const REQUEST = 'yasp/constants/REQUEST';
const OK = 'yasp/constants/OK';
const ERROR = 'yasp/constants/ERROR';

export const constantsActions = {
  REQUEST,
  OK,
  ERROR,
};

const getConstantsRequest = () => ({
  type: REQUEST,
});
const getConstantsOk = (payload) => ({
  type: OK,
  payload,
});
const getConstantsError = (payload) => ({
  type: ERROR,
  payload,
});

export const getConstants = (host = API_HOST) => (dispatch) => {
  getConstantsRequest();
  return fetch(`${host}${url}`, { credentials: 'include' })
  .then(response => response.json())
  .then(json => {
    const links = Object.keys(json.navbar_pages).map(
      (key) => ({ path: `/${key}`, name: json.navbar_pages[key].name })
    );
    const transformedData = {
      ...json,
      links,
    };
    dispatch(getConstantsOk(transformedData));
  })
  .catch(error => {
    dispatch(getConstantsError(error));
  });
};
