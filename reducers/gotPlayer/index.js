import playerReducer, { player } from './player';
import matches from './matches';
import heroes from './heroes';
import { combineReducers } from 'redux';

export default combineReducers({
  playerReducer,
  matches,
  heroes,
});

export { player };
