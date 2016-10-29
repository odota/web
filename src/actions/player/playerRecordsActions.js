/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerRecords } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/records`;

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

export const getPlayerRecords = (playerId, options = {}) => (dispatch, getState) => {
  if (playerRecords.isLoaded(getState(), playerId)) {
    dispatch(getPlayerRecordsOk(playerRecords.getRecordsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerRecordsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => Object.keys(json).map(key => ({
      name: key,
      value: json[key][key],
      hero_id: json[key].hero_id,
      start_time: json[key].start_time,
      match_id: json[key].match_id,
      game_mode: json[key].game_mode,
    })))
    .then(json => dispatch(getPlayerRecordsOk(json, playerId)))
    .catch(error => dispatch(getPlayerRecordsError(error, playerId)));
};
