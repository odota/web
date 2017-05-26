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

      // Compute in reverse order so that first n can be discarded
      for (let i = trends.length - 1; i > chunkSize - 1; i -= 1) {
        trends[i].value = (trends[i].value - trends[i - chunkSize].value) / chunkSize;
        
        // Update graph index so it starts at 1 (since we only display 480 at a time)
        trends[i].x -= chunkSize;
      }

      // Discard first 20 elements
      trends.splice(0, chunkSize);

      // Return 480 elements
      return trends;
    })
    .then(json => dispatch(getPlayerTrendsOk(json, playerId)))
    .catch(error => dispatch(getPlayerTrendsError(error, playerId)));
};
