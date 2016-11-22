/* global API_HOST */
import fetch from 'isomorphic-fetch';
import { playerRankings } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/rankings`;

const REQUEST = 'playerRankings/REQUEST';
const OK = 'playerRankings/OK';
const ERROR = 'playerRankings/ERROR';

export const playerRankingsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerRankingsRequest = id => ({ type: REQUEST, id });

export const getPlayerRankingsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerRankingsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerRankings = (playerId, options = {}) => (dispatch, getState) => {
  // TODO - there is no reason to dispatch an OK in the positive case here that I can think of.
  // Instead, we should change this (and all like it in players probably) to be triggered on the negative
  // condition only (which is important to do).
  if (playerRankings.isLoaded(getState(), playerId)) {
    dispatch(getPlayerRankingsOk(playerRankings.getRankingList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerRankingsRequest(playerId));
  }
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    // Filter out the rankings where the person is so bad they don't even have a rank for that hero
    .then(json => json.filter(ranking => ranking.rank).sort((a, b) => (b.rank / b.card) - (a.rank / a.card)))
    .then(json => dispatch(getPlayerRankingsOk(json, playerId)))
    .catch(error => dispatch(getPlayerRankingsError(error, playerId)));
};
