import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  responsiveStateReducer,
  createResponsiveStoreEnhancer,
} from 'redux-responsive';
import app from 'reducers';

const reducer = combineReducers({
  app,
  browser: responsiveStateReducer,
});
/* eslint-disable no-underscore-dangle */
// This enables the redux dev tools extension, or does nothing if not installed
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default createStore(
  reducer,
  composeEnhancers(
    createResponsiveStoreEnhancer(),
    applyMiddleware(thunkMiddleware),
  ));
