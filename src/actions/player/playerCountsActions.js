/* global API_HOST */
import fetch from 'isomorphic-fetch';
import patch from 'dotaconstants/build/patch.json';
import region from 'dotaconstants/build/region.json';
import {
  playerCounts,
} from 'reducers';
import {
  getUrl,
} from 'actions/utility';
import {
  getPercentWin,
} from 'utility';
import strings from 'lang';

const url = playerId => `/api/players/${playerId}/counts`;

const REQUEST = 'playerCounts/REQUEST';
const OK = 'playerCounts/OK';
const ERROR = 'playerCounts/ERROR';

export const playerCountsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerCountsRequest = id => ({
  type: REQUEST,
  id,
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

const patchLookup = {};
patch.forEach((patchElement, index) => {
  patchLookup[index] = patchElement.name;
});

const countTypes = {
  patch: patchLookup,
  region,
  is_radiant: {
    0: strings.general_dire,
    1: strings.general_radiant,
  },
};

export const getPlayerCounts = (playerId, options = {}) => (dispatch, getState) => {
  if (playerCounts.isLoaded(getState(), playerId)) {
    dispatch(getPlayerCountsOk(playerCounts.getCountsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerCountsRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then((json) => {
      const data = {};
      Object.keys(json).forEach((key) => {
        // Translate each ID to a string
        data[key] = {
          name: key,
          list: Object.keys(json[key])
            .map(innerKey => ({
              category: strings[`${key}_${innerKey}`] || (countTypes[key] && countTypes[key][innerKey]) || innerKey,
              matches: json[key][innerKey].games,
              winPercent: getPercentWin(json[key][innerKey].win, json[key][innerKey].games),
            })).sort((a, b) => b.category - a.category),
        };
      });
      return data;
    })
    .then(json => dispatch(getPlayerCountsOk(json, playerId)))
    .catch(error => dispatch(getPlayerCountsError(error, playerId)));
};
