import playerReducer, { getPlayer } from './player';
import matches, { getPlayerMatches } from './matches';
import heroes from './heroes';
import winloss, { getWinLoss } from './winloss';
import { combineReducers } from 'redux';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
  winloss,
});

const player = {
  ...getPlayer,
  ...getWinLoss,
};

export { player, getPlayerMatches as playerMatches };
