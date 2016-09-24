import fetch from 'isomorphic-fetch';
import { API_HOST } from '../';
import { playerRankings } from '../../reducers';
import { getUrl } from '../utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/rankings`;

const REQUEST = 'playerRankings/REQUEST';
const OK = 'playerRankings/OK';
const ERROR = 'playerRankings/ERROR';
const SORT = 'playerRankings/SORT';

export const playerRankingsActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerRankingsSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerRankingsRequest = (id) => ({ type: REQUEST, id });

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

export const getPlayerRankings = (playerId, options = {}, host = API_HOST) => (dispatch, getState) => {
  // TODO - there is no reason to dispatch an OK in the positive case here that I cank think of.
  // Instead, we should change this (and all like it in players probably) to be triggered on the negative
  // condition only (which is important to do).
  if (playerRankings.isLoaded(getState(), playerId)) {
    dispatch(getPlayerRankingsOk(playerRankings.getRankingList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerRankingsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    // We want to filter out the rankings where the person is so bad they don't even have a rank
    // for that hero
    .then(json => dispatch(getPlayerRankingsOk(json.filter(rankings => rankings.rank), playerId)))
    .catch(error => dispatch(getPlayerRankingsError(error, playerId)));
};
