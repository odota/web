import playerReducer, { player } from './player';
import matches from './matches';
import { combineReducers } from 'redux';

export default combineReducers({
  playerReducer,
  matches,
});

export { player };
