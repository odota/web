import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';

const url = (playerId, numMatches) => `/api/players/${playerId}/matches?limit=${numMatches}`;

const REQUEST = 'yasp/playerMatches/REQUEST';
const OK = 'yasp/playerMatches/OK';
const ERROR = 'yasp/playerMatches/ERROR';
const SORT = 'yasp/playerMatches/SORT';

export const playerMatchesActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerMatchesSort = (sortField, sortState, sortFn) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
});

const getPlayerMatchesRequest = () => ({ type: REQUEST });

const getPlayerMatchesOk = (payload) => ({
  type: OK,
  payload,
});

const getPlayerMatchesError = (payload) => ({
  type: ERROR,
  payload,
});

const playerMatchTransformSwitch = (match, field, heroes) => {
  switch (field) {
    case 'hero_id':
      return `${HOST_URL}${heroes[match[field]].img}`;
    case 'radiant_win':
      return match.player_slot < 64 && match[field] || match.player_slot >= 64 && !match[field] ? 'W' : 'L';
    case 'game_mode':
      return match[field] === 22 ? 'Ranked All Pick' : 'All Pick';
    case 'start_time': {
      const today = new Date();
      const matchDate = new Date(match[field] * 1000);
      const leftoverDays = Math.floor((today - matchDate) / 1000 / 60 / 60 / 24);
      switch (leftoverDays) {
        case 0:
          return 'Today';
        case 1:
          return 'Yesterday';
        default:
          return `${leftoverDays} days ago`;
      }
    }
    case 'duration':
      return `${Math.floor(match[field] / 60)}:${match[field] % 60}`;
    default:
      return match[field];
  }
};

// TODO - memoize this with selectors
const playerMatchTransform = (match) => (heroes) => {
  const transformedMatch = {};
  Object.keys(match).forEach((field) => {
    transformedMatch[`${field}Display`] = playerMatchTransformSwitch(match, field, heroes);
  });
  return transformedMatch;
};

export const getPlayerMatches = (playerId, numMatches, host = HOST_URL) => (dispatch, getState) => {
  dispatch(getPlayerMatchesRequest());
  return fetch(`${host}${url(playerId, numMatches)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => {
      const transformedMatches = json.matches.map(match =>
        playerMatchTransform(match)(getState().yaspReducer.gotConstants.heroes)
      );
      dispatch(getPlayerMatchesOk(transformedMatches));
    })
    .catch(error => {
      console.error(error);
      return dispatch(getPlayerMatchesError(error));
    });
};
