import playerReducer, { player } from './player';
import matches from './matches';
import heroes from './heroes';
import winloss from './winloss';
import { combineReducers } from 'redux';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
  winloss,
});

export { player };
