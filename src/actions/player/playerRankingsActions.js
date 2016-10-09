import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
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
  // TODO - there is no reason to dispatch an OK in the positive case here that I cank think of.
  // Instead, we should change this (and all like it in players probably) to be triggered on the negative
  // condition only (which is important to do).
  if (playerRankings.isLoaded(getState(), playerId)) {
    dispatch(getPlayerRankingsOk(playerRankings.getRankingList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerRankingsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    // We want to filter out the rankings where the person is so bad they don't even have a rank
    // for that hero
    // TODO consider moving to reducer
    .then(json => dispatch(getPlayerRankingsOk(json.filter(rankings => rankings.rank), playerId)))
    .catch(error => dispatch(getPlayerRankingsError(error, playerId)));
};
