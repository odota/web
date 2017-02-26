/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  getUrl,
} from 'actions/utility';
import {
  isRadiant,
} from 'utility';

const url = playerId => `/api/players/${playerId}/matches`;

const REQUEST = 'playerTrends/REQUEST';
const OK = 'playerTrends/OK';
const ERROR = 'playerTrends/ERROR';

export const playerTrendsActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerTrendsRequest = id => ({
  type: REQUEST,
  id,
});

export const getPlayerTrendsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerTrendsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

const getCumalativeSums = (matches, fieldName) =>
  matches.reduce((cumulativeList, match, index) => {
    if (cumulativeList.length > 0) {
      const prevTotal = cumulativeList[index - 1];
      cumulativeList.push(prevTotal + match[fieldName]);
    } else {
      cumulativeList.push(match[fieldName]);
    }
    return cumulativeList;
  }, []);

const getWinRateCumlativeSums = matches =>
  matches.reduce((cumulativeList, match, index) => {
    // 1 for win 0 for loss
    const winInt = match.radiant_win === isRadiant(match.player_slot) ? 1 : 0;
    if (index === 0) {
      cumulativeList.push(winInt);
    } else {
      const prevRate = cumulativeList[index - 1];
      const newRate = ((prevRate * index) + winInt) / (index + 1);
      cumulativeList.push(newRate);
    }

    return cumulativeList;
  }, []);

export const getPlayerTrends = (playerId, options = {}, fieldName) => (dispatch) => {
  dispatch(getPlayerTrendsRequest(playerId));
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then((response) => {
      const winRateTrend = fieldName === 'win_rate'; // Special case
      const matches = winRateTrend
        ? response.reverse()
        : response.filter(match => match[fieldName] !== undefined && match[fieldName] !== null)
          .reverse();

      const cumulativeSums = winRateTrend
        ? getWinRateCumlativeSums(matches)
        : getCumalativeSums(matches, fieldName);

      return cumulativeSums.map((value, index) => {
        const match = matches[index];
        return {
          x: index + 1,
          value: winRateTrend
            ? (value * 100).toFixed(2)
            : Number((value / (index + 1)).toFixed(2)),
          independent_value: winRateTrend
            ? (value * 100).toFixed(2)
            : match[fieldName],
          match_id: match.match_id,
          hero_id: match.hero_id,
          win: isRadiant(match.player_slot) === match.radiant_win,
          game_mode: match.game_mode,
          duration: match.duration,
          start_time: match.start_time,
        };
      });
    })
    .then(json => dispatch(getPlayerTrendsOk(json, playerId)))
    .catch(error => dispatch(getPlayerTrendsError(error, playerId)));
};
