import fetch from 'isomorphic-fetch';
import { API_HOST } from 'config';
import { playerHistogram } from 'reducers';
import { getUrl } from 'actions/utility';

// const excludedOptions = ['limit'];
const url =
  histogramName =>
   playerId =>
    `/api/players/${playerId}/histograms/${histogramName}`;

const REQUEST = 'playerHistogram/REQUEST';
const OK = 'playerHistogram/OK';
const ERROR = 'playerHistogram/ERROR';

export const playerHistogramActions = {
  REQUEST,
  OK,
  ERROR,
};

export const getPlayerHistogramRequest = (id) => ({ type: REQUEST, id });

export const getPlayerHistogramOk = (payload, id, histogramName) => ({
  type: OK,
  payload: {
    [histogramName]: payload,
  },
  id,
});

export const getPlayerHistogramError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

const buckets = 40;

const bucketizeColumns = (columns, xVals, histogramName) => {
  const max = Math.max(...xVals);
  const bucketSize = ~~(max / buckets);
  const newXVals = [];
  let i = 0;
  for (i; i < buckets; i++) {
    newXVals.push(bucketSize * i);
  }
  i = 0;
  const newColumns = newXVals.map((val) => {
    const newObj = { win: 0, games: 0 };
    let enteredLoop = false;
    while (i < xVals.length && xVals[i] <= val) {
      newObj.win += columns[i].win;
      newObj.games += columns[i].games;
      i++;
      enteredLoop = true;
    }
    if (!enteredLoop) {
      i++;
    } else {
      enteredLoop = false;
    }
    return newObj;
  });
  const removedIndices = [];
  const filteredCols = newColumns.filter((obj, index) => {
    const hasNoData = obj.games === 0;
    if (hasNoData) {
      removedIndices.push(index);
    }
    return !hasNoData;
  });

  return {
    [histogramName]: filteredCols,
    x: newXVals.filter((val, index) => !removedIndices.includes(index)),
  };
};

export const getPlayerHistogram = (playerId, histogramName, host = API_HOST) => (dispatch, getState) => {
  if (playerHistogram.isLoaded(getState(), playerId, histogramName)) {
    dispatch(getPlayerHistogramOk(
      playerHistogram.getData(getState(), playerId, histogramName),
      playerId,
      histogramName
    ));
  } else {
    dispatch(getPlayerHistogramRequest(playerId, histogramName));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, null, url(histogramName))}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json =>
      Object.keys(json).reduce((columns, key) => {
        columns.x.push(key);
        columns[histogramName].push(json[key]);
        return columns;
      }, {
        x: [],
        [histogramName]: [],
      }))
    .then(json => (json.x.length > buckets ? bucketizeColumns(json[histogramName], json.x, histogramName) : json))
    .then(json => dispatch(getPlayerHistogramOk(json, playerId, histogramName)));
    // .catch(error => dispatch(getPlayerHistogramError(error, playerId, histogramName)));
};
