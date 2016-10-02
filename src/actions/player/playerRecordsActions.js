import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import { playerRecords } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/records`;

const REQUEST = 'playerRecords/REQUEST';
const OK = 'playerRecords/OK';
const ERROR = 'playerRecords/ERROR';
const SORT = 'playerRecords/SORT';

export const playerRecordsActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerRecordsSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerRecordsRequest = (id) => ({ type: REQUEST, id });

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
    })))
    .then(json => dispatch(getPlayerRecordsOk(json, playerId)))
    .catch(error => dispatch(getPlayerRecordsError(error, playerId)));
};
