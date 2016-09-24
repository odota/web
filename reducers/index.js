import { combineReducers } from 'redux';
import metadata from './metadata';
import match from './match';
import heroRanking, { ranking } from './heroRanking';
import heroBenchmark, { benchmark } from './heroBenchmark';
import search from './search';
import gotPlayer, {
  player,
  playerMatches,
  playerPeers,
  playerHeroes,
  playerPros,
  playerRankings,
  playerRecords,
  playerCounts,
} from './gotPlayer';
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
  playerPros,
  playerRankings,
  playerRecords,
  playerCounts,
  getTab as tab,
  getForm as form,
  benchmark,
  ranking,
  getTable as table,
};

export default combineReducers({
  metadata,
  gotPlayer,
  match,
  heroRanking,
  heroBenchmark,
  search,
  appBar,
  tab,
  form,
  request,
  distributions,
  table,
});
