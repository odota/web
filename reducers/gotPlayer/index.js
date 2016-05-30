import player from './player';
import matches from './matches';
import { combineReducers } from 'redux';

export default combineReducers({
  player,
  matches,
});
