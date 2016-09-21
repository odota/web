import { combineReducers } from 'redux';
import playerReducer, { getPlayer } from './player';
import matches, { getPlayerMatches } from './matches';
import peers, { getPlayerPeers } from './peers';
import heroes, { getPlayerHeroes } from './heroes';
import rankings, { getPlayerRankings } from './rankings';
import winloss, { getWinLoss } from './winloss';
import records, { getPlayerRecords } from './records';
import counts, { getPlayerCounts } from './counts';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
  rankings,
  winloss,
  peers,
  records,
  counts,
});

const player = {
  ...getPlayer,
  ...getWinLoss,
};

export {
  player,
  getPlayerMatches as playerMatches,
  getPlayerPeers as playerPeers,
  getPlayerHeroes as playerHeroes,
  getPlayerRankings as playerRankings,
  getPlayerRecords as playerRecords,
  getPlayerCounts as playerCounts,
};
