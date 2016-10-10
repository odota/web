import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import { playerWordcloud } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/wardmap`;

const REQUEST = 'playerWordcloud/REQUEST';
const OK = 'playerWordcloud/OK';
const ERROR = 'playerWordcloud/ERROR';

export const playerWordcloudActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerWordcloudRequest = id => ({ type: REQUEST, id });

export const getPlayerWordcloudOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerWordcloudError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerWordcloud = (playerId, options = {}) => (dispatch, getState) => {
  if (playerWordcloud.isLoaded(getState(), playerId)) {
    dispatch(getPlayerWordcloudOk(playerWordcloud.getHeroList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerWordcloudRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerWordcloudOk(json, playerId)))
    .catch(error => dispatch(getPlayerWordcloudError(error, playerId)));
};
