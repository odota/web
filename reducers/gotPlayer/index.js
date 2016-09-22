import { combineReducers } from 'redux';
import playerReducer, { getPlayer } from './player';
import matches, { getPlayerMatches } from './matches';
import peers, { getPlayerPeers } from './peers';
import heroes, { getPlayerHeroes } from './heroes';
import pros, { getPlayerPros } from './pros';
import rankings, { getPlayerRankings } from './rankings';
import winloss, { getWinLoss } from './winloss';
import records, { getPlayerRecords } from './records';
import counts, { getPlayerCounts } from './counts';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
  pros,
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
  getPlayerPros as playerPros,
  getPlayerRankings as playerRankings,
  getPlayerRecords as playerRecords,
  getPlayerCounts as playerCounts,
};
