import gotMetadata from './gotMetadata';
import gotConstants from './gotConstants';
import gotMatch from './gotMatch';
import gotPlayer, { player, playerMatches, playerPeers, playerHeroes, playerRecords } from './gotPlayer';
import gotSearch from './gotSearch';
import appBar from './appBar';
import tab, { getTab } from './tab';
import form, { getForm } from './form';
import request from './request';
import distributions from './distributions';
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
  getTable as table,
};

export default combineReducers({
  gotMetadata,
  gotPlayer,
  gotMatch,
  gotConstants,
  gotSearch,
  appBar,
  tab,
  form,
  request,
  distributions,
  table,
});
