import gotMetadata from './gotMetadata';
import gotConstants from './gotConstants';
import gotMatch from './gotMatch';
import gotPlayer from './gotPlayer';
import gotSearch from './gotSearch';
import appBar from './appBar';
import { combineReducers } from 'redux';

const REDUCER_KEY = 'yaspReducer';

export { REDUCER_KEY };

export default combineReducers({
  gotMetadata,
  gotPlayer,
  gotMatch,
  gotConstants,
  gotSearch,
  appBar,
});
