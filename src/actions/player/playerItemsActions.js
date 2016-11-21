/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  playerItems,
} from 'reducers';
import {
  getUrl,
} from 'actions/utility';

// const url = playerId => `/api/players/${playerId}/items`;
const url = playerId => `/api/players/${playerId}`;

const REQUEST = 'playerItems/REQUEST';
const OK = 'playerItems/OK';
const ERROR = 'playerItems/ERROR';

export const playerItemsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerItemsRequest = id => ({
  type: REQUEST,
  id,
});

export const getPlayerItemsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerItemsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerItems = (playerId, options = {}, host = API_HOST) => (dispatch, getState) => {
  if (playerItems.isLoaded(getState(), playerId)) {
    dispatch(getPlayerItemsOk(playerItems.getItemsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerItemsRequest(playerId));
  }

  // TODO: Actually return Items
  return fetch(`${host}${getUrl(playerId, options, url)}`)
  //   .then(response => response.json())
  //   .then(json => Object.keys(json).map(key => ({
  //     name: key,
  //   })))
  //   .then(json => dispatch(getPlayerItemsOk(json, playerId)))
    .then(() => dispatch(getPlayerItemsOk([], playerId)))
    .catch(error => dispatch(getPlayerItemsError(error, playerId)));
};
