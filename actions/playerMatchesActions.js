import fetch from 'isomorphic-fetch';
import { HOST_URL } from './';
import { playerMatchTransform } from '../yasp.config';

const url = (playerId, numMatches) => `/api/players/${playerId}/matches?limit=${numMatches}`;

const REQUEST = 'yasp/playerMatches/REQUEST';
const OK = 'yasp/playerMatches/OK';
const ERROR = 'yasp/playerMatches/ERROR';

export const playerMatchesActions = {
  REQUEST,
  OK,
  ERROR,
};

const getPlayerMatchesRequest = () => ({ type: REQUEST });

const getPlayerMatchesOk = (payload) => ({
  type: OK,
  payload,
});

const getPlayerMatchesError = (payload) => ({
  type: ERROR,
  payload,
});

export const getPlayerMatches = (playerId, numMatches, host = HOST_URL) => (dispatch) => {
  dispatch(getPlayerMatchesRequest());
  return fetch(`${host}${url(playerId, numMatches)}`)
    .then(response => response.json())
    .then(json => {
      const transformedMatches = json.matches.map(playerMatchTransform);
      dispatch(getPlayerMatchesOk(transformedMatches));
    })
    .catch(error => {
      console.error(error);
      return dispatch(getPlayerMatchesError(error));
    });
};
