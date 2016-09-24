import fetch from 'isomorphic-fetch';
import constants from 'dotaconstants';

import { API_HOST } from 'config';
import { playerCounts } from 'reducers';
import { getUrl } from 'actions/utility';
import { getPercentWin } from 'utility';

const url = playerId => `/api/players/${playerId}/counts`;

const REQUEST = 'playerCounts/REQUEST';
const OK = 'playerCounts/OK';
const ERROR = 'playerCounts/ERROR';
const SORT = 'playerCounts/SORT';

export const playerCountsActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerCountsSort = listName => (sortField, sortState, sortFn, id) => ({
  type: SORT,
  listName,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerCountsRequest = (id) => ({ type: REQUEST, id });

export const getPlayerCountsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerCountsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerCounts = (playerId, options = {}, host = API_HOST) => (dispatch, getState) => {
  if (playerCounts.isLoaded(getState(), playerId)) {
    dispatch(getPlayerCountsOk(playerCounts.getCountsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerCountsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
      const data = {};
      Object.keys(json).forEach(key => {
        // We need to map each inner object to something we can understand
        data[key] = {
          name: key,
          list: Object.keys(json[key])
          .filter(innerKey => constants[key][innerKey])
          .map(innerKey => ({
            category: constants[key][innerKey].name || constants[key][innerKey],
            matches: json[key][innerKey].games,
            winPercent: getPercentWin(json[key][innerKey].win, json[key][innerKey].games),
          })),
        };
      });
      return data;
    })
    .then(json => dispatch(getPlayerCountsOk(json, playerId)))
    .catch(error => dispatch(getPlayerCountsError(error, playerId)));
};
