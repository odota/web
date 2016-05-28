import React from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import appReducer, { REDUCER_KEY } from './reducers';
import { getMetadata } from './actions';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer as routing } from 'react-router-redux';
import App from './components/App';
import Match from './components/Match';
import Player from './components/Player';
import Home from './components/Home';

// Load CSS
// These are sprites, will be needed at some point
//require('./node_modules/dota2-minimap-hero-sprites/assets/stylesheets/dota2minimapheroes.css');

require('./node_modules/font-awesome/css/font-awesome.css');
const loggerMiddleware = createLogger();
const reducer = combineReducers({
  [REDUCER_KEY]: appReducer,
  routing
});
const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware), // lets us dispatch() functions
    applyMiddleware(loggerMiddleware) // neat middleware that logs actions
    /*
    (window.devToolsExtension ? window.devToolsExtension() : () => {
    }) //This enables the redux dev tools extension, or does nothing if not installed
    */
  )
);

// Fetch metadata (used on all pages)
// store.dispatch(Actions.fetchData(Actions.METADATA));
store.dispatch(getMetadata());
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
//history.listen(function(location) {Actions.routeChange(location)});
let reactElement = document.getElementById('react');
render(<Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="matches/:match_id" component={Match}>
                <Route path=":info"/>
            </Route>
            <Route path="players/:account_id" component={Player}>
                <Route path="/:info">
                    <Route path="/:subkey">
                    </Route>
                </Route>
            </Route>
        </Route>
    </Router>
</Provider>, reactElement);
/*
<Route path="distributions" component={Distribution}/>
<Route path="carry" component={Carry}/>
<Route path="picks/:n" component={Picks}/>
<Route path="mmstats" component={MMStats}/>
<Route path="rankings/:hero_id" component={Ranking}/>
<Route path="benchmarks/:hero_id" component={Benchmark}/>
<Route path="search" component={Search}/>
<Route path="status" component={Status}/>
*/
