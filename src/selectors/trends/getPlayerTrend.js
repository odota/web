import { createSelector } from 'reselect';
import { playerMatches } from 'reducers';

// TODO - make this shape fit what graph.jsx is expecting or change graph.jsx
const getMatches = fieldName =>
  id =>
    state =>
      playerMatches
        .getMatchList(state, id)
        .reduce((cumulativeList, match, index) => {
          if (cumulativeList.length > 0) {
            const prevTotal = cumulativeList[index - 1];
            cumulativeList.push(prevTotal + match[fieldName]);
          } else {
            cumulativeList.push(match[fieldName]);
          }
          return cumulativeList;
        }, [])
        .map((value, index) => ({ x: index, value: Number((value / (index + 1)).toFixed(2)) }));

const getCumulativeDataByField = fieldName => id => createSelector(
  [getMatches(fieldName)(id)],
  matches => matches
);

export default getCumulativeDataByField;
