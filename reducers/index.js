import gotMetadata from './gotMetadata';
import gotConstants from './gotConstants';
import gotMatch from './gotMatch';
import gotPlayer, { player, playerMatches, playerPeers, playerHeroes, playerRecords } from './gotPlayer';
import gotSearch from './gotSearch';
import gotRanking, { ranking } from './gotRanking';
import gotBenchmark, { benchmark } from './gotBenchmark';
import heroes from './heroes';
import appBar from './appBar';
import tab, { getTab } from './tab';
import form, { getForm } from './form';
import table, { getTable } from './table';
import { combineReducers } from 'redux';

const REDUCER_KEY = 'yaspReducer';

export { REDUCER_KEY };

// This is where we will export all our state retrieval functions (better encapsulation)
export {
  player,
  playerMatches,
  playerPeers,
  playerHeroes,
  playerRecords,
  getTab as tab,
  getForm as form,
  benchmark,
  ranking,
  getTable as table,
};

export default combineReducers({
  gotMetadata,
  gotPlayer,
  gotMatch,
  gotConstants,
  gotSearch,
  gotRanking,
  gotBenchmark,
  heroes,
  appBar,
  tab,
  form,
  table,
});
