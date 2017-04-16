/* global API_HOST */
import fetch from 'isomorphic-fetch';

const REQUEST = 'records/REQUEST';
const OK = 'records/OK';
const ERROR = 'records/ERROR';

export const recordsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getRecordsRequest = () => ({
  type: REQUEST,
});

export const getRecordsOk = payload => ({
  type: OK,
  payload,
});

export const getRecordsError = payload => ({
  type: ERROR,
  payload,
});

export const getRecords = info => (dispatch) => {
  dispatch(getRecordsRequest());
  return fetch(`${API_HOST}/api/records/${info}`)
    .then(response => response.json())
    .then(json => dispatch(getRecordsOk(json)))
    .catch(error => dispatch(getRecordsError(error)));
};
