import { createSelector } from 'reselect';
import { playerRankings } from 'reducers';

const getRankings = (id, numRows) => state => playerRankings.getRankingList(state, id).slice(0, numRows);

const transformPlayerRankingsById = (id, numRows) => createSelector(
  [getRankings(id, numRows)],
  rankings => rankings
);

export default transformPlayerRankingsById;
