import gotMetadata from './gotMetadata';
import gotConstants from './gotConstants';
import gotMatch from './gotMatch';
import gotPlayer, { player, playerMatches, playerPeers } from './gotPlayer';
import gotSearch from './gotSearch';
import appBar from './appBar';
import { combineReducers } from 'redux';

const REDUCER_KEY = 'yaspReducer';

export { REDUCER_KEY };

// This is where we will export all our state retrieval functions (better encapsulation)
export {
  player,
  playerMatches,
  playerPeers,
};

export default combineReducers({
  gotMetadata,
  gotPlayer,
  gotMatch,
  gotConstants,
  gotSearch,
  appBar,
});
