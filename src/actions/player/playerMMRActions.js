/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerMMR } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/ratings`;

const REQUEST = 'playerMMR/REQUEST';
const OK = 'playerMMR/OK';
const ERROR = 'playerMMR/ERROR';

export const playerMMRActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerMMRRequest = id => ({ type: REQUEST, id });

export const getPlayerMMROk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerMMRError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerMMR = (playerId, options = {}) => (dispatch, getState) => {
  if (!playerMMR.isLoaded(getState(), playerId)) {
    dispatch(getPlayerMMRRequest(playerId));
  }

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then(json => json.map(mmr => ({
      value: mmr.solo_competitive_rank,
      x: new Date(mmr.time),
      competitiveRank: mmr.competitive_rank,
    })))
    .then(json => dispatch(getPlayerMMROk(json, playerId)))
    .catch(error => dispatch(getPlayerMMRError(error, playerId)));
};
