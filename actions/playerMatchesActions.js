import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerMatchTransform } from '../transformations';

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
