/* global API_HOST */
import fetch from 'isomorphic-fetch';
import {
  getUrl,
} from 'actions/utility';

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

export const getPlayerTrends = (playerId, options = {}, fieldName) => (dispatch) => {
  dispatch(getPlayerTrendsRequest(playerId));
  return fetch(`${API_HOST}${getUrl(playerId, options, url)}`)
    .then(response => response.json())
    .then((response) => {
      let cumulativeSum = 0;
      const chunkSize = 20;

      // Compute sum of data (to act as in integral over data field)
      // trends[i].value = sum(0 -> i, attribute)
      const trends = response.reverse().reduce((dataList, match) => {
        const win = (match.player_slot < 128) === match.radiant_win;
        const currentValue = fieldName === 'win_rate'
          ? Number(win) * 100 // true -> 100 false -> 0
          : match[fieldName];

        if (currentValue === undefined || currentValue === null) {
          // filter
          return dataList;
        }

        cumulativeSum += currentValue;

        const nextIndex = dataList.length + 1;
        dataList.push({
          x: nextIndex,
          value: Number(cumulativeSum).toFixed(2),
          independent_value: currentValue,
          match_id: match.match_id,
          hero_id: match.hero_id,
          game_mode: match.game_mode,
          duration: match.duration,
          start_time: match.start_time,
          win,
        });
        return dataList;
      }, []);

      // Apply mean-smoothing by taking differences of the previously computed integral
      for (let i = 0; i < trends.length; i += 1) {
        if (i < trends.length - chunkSize) {
          trends[i].value = (trends[i + chunkSize].value - trends[i].value) / chunkSize;
        } else {
          trends[i].value = trends[i].independent_value;
          for (let j = 1; j < chunkSize; j += 1) {
            trends[i].value += trends[i - j].independent_value;
          }
          trends[i].value /= chunkSize;
        }
      }

      console.log(trends);

      return trends;
    })
    .then(json => dispatch(getPlayerTrendsOk(json, playerId)))
    .catch(error => dispatch(getPlayerTrendsError(error, playerId)));
};
