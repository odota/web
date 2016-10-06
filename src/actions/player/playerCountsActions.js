import fetch from 'isomorphic-fetch';
import patch from 'dotaconstants/json/patch.json';
import region from 'dotaconstants/json/region.json';
import gameMode from 'dotaconstants/json/game_mode.json';
import lobbyType from 'dotaconstants/json/lobby_type.json';
import leaverStatus from 'dotaconstants/json/leaver_status.json';
import laneRole from 'dotaconstants/json/lane_role.json';
import {
  API_HOST
} from 'config';
import {
  playerCounts
} from 'reducers';
import {
  getUrl
} from 'actions/utility';
import {
  getPercentWin
} from 'utility';

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

export const getPlayerCountsRequest = id => ({
  type: REQUEST,
  id
});

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

const countTypes = {
  leaver_status: leaverStatus,
  game_mode: gameMode,
  lobby_type: lobbyType,
  lane_role: laneRole,
  region: region,
  patch: patch,
};

export const getPlayerCounts = (playerId, options = {}) => (dispatch, getState) => {
  if (playerCounts.isLoaded(getState(), playerId)) {
    dispatch(getPlayerCountsOk(playerCounts.getCountsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerCountsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`, {
      credentials: 'include'
    })
    .then(response => response.json())
    // TODO consider moving to reducer
    .then((json) => {
      const data = {};
      Object.keys(json).forEach((key) => {
        // We need to map each inner object to something we can understand
        data[key] = {
          name: key,
          list: Object.keys(json[key])
            .filter(innerKey => countTypes[key][innerKey])
            .map(innerKey => ({
              category: (countTypes[key][innerKey] && countTypes[key][innerKey].name) || countTypes[key][innerKey],
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
