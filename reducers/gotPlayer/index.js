import playerReducer, { getPlayer } from './player';
import matches, { getPlayerMatches } from './matches';
import peers, { getPlayerPeers } from './peers';
import heroes, { getPlayerHeroes } from './heroes';
import winloss, { getWinLoss } from './winloss';
import records, { getPlayerRecords } from './records';
import counts, { getPlayerCounts } from './counts';
import { combineReducers } from 'redux';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
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
  getPlayerRecords as playerRecords,
  getPlayerCounts as playerCounts,
};
