/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerRecords } from 'reducers';
import { getUrl } from 'actions/utility';

const url = playerId => `/api/players/${playerId}/matches`;

const REQUEST = 'playerRecords/REQUEST';
const OK = 'playerRecords/OK';
const ERROR = 'playerRecords/ERROR';

export const playerRecordsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerRecordsRequest = id => ({ type: REQUEST, id });

export const getPlayerRecordsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerRecordsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerRecords = (playerId, options = {}, subInfo) => (dispatch, getState) => {
  const modifiedOptions = { ...options, sort: subInfo, limit: 10 };
  if (playerRecords.isLoaded(getState(), playerId)) {
    dispatch(getPlayerRecordsOk(playerRecords.getRecordsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerRecordsRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, modifiedOptions, url)}`)
    .then(response => response.json())
    .then(json => dispatch(getPlayerRecordsOk(json, playerId)))
    .catch(error => dispatch(getPlayerRecordsError(error, playerId)));
};
