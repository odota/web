import fetch from 'isomorphic-fetch';
import { HOST_URL } from '../actions';
const url = '/api/metadata';
const REQUEST = 'yasp/metadata/REQUEST';
const OK = 'yasp/metadata/OK';
const ERROR = 'yasp/metadata/ERROR';

export const metadataActions = {
  REQUEST,
  OK,
  ERROR,
};

const getMetadataRequest = () => ({
  type: REQUEST,
});
const getMetadataOk = (payload) => ({
  type: OK,
  payload,
});
const getMetadataError = (payload) => ({
  type: ERROR,
  payload,
});

export const getMetadata = (host = HOST_URL) => (dispatch) => {
  getMetadataRequest();
  return fetch(`${host}${url}`, { credentials: 'include' })
  .then(response => response.json())
  .then(json => dispatch(getMetadataOk(json)))
  .catch(error => {
    dispatch(getMetadataError(error));
  });
};
