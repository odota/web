import { combineReducers } from 'redux';
import gotMetadata from './gotMetadata';
import gotConstants from './gotConstants';
import match from './match';
import gotPlayer, { player, playerMatches, playerPeers, playerHeroes, playerRecords } from './gotPlayer';
import gotRanking, { ranking } from './gotRanking';
import gotBenchmark, { benchmark } from './gotBenchmark';
import heroes from './heroes';
import search from './search';
import appBar from './appBar';
import tab, { getTab } from './tab';
import form, { getForm } from './form';
import request from './request';
import distributions from './distributions';
import table, { getTable } from './table';

const REDUCER_KEY = 'app';

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
  match,
  gotConstants,
  gotRanking,
  gotBenchmark,
  heroes,
  search,
  appBar,
  tab,
  form,
  request,
  distributions,
  table,
});
