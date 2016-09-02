import { combineReducers } from 'redux';
import playerReducer, { getPlayer } from './player';
import matches, { getPlayerMatches } from './matches';
import peers, { getPlayerPeers } from './peers';
import heroes, { getPlayerHeroes } from './heroes';
import winloss, { getWinLoss } from './winloss';
import records, { getPlayerRecords } from './records';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
  winloss,
  peers,
  records,
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
};
