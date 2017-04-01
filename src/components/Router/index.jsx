import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from 'components/App';
import Player from 'components/Player';
import Home from 'components/Home';
import Search from 'components/Search';
import Explorer from 'components/Explorer';
import FourOhFour from 'components/FourOhFour';
import Heroes from 'components/Heroes';
import Request from 'components/Request';
import Distributions from 'components/Distributions';
import Status from 'components/Status';
import Matches from 'components/Matches';
import Assistant from 'components/Assistant';
import store from 'store';
import { getMetadata } from 'actions';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="matches(/:matchId)(/:info)" component={Matches} />
        <Route path="players/:playerId(/:info)(/:subInfo)" component={Player} />
        <Route path="heroes(/:heroId)(/:info)" component={Heroes} />
        <Route path="distributions(/:info)" component={Distributions} />
        <Route path="request" component={Request} />
        <Route path="status" component={Status} />
        <Route path="explorer" component={Explorer} />
        <Route path="search" component={Search} />
        <Route path="assistant" component={Assistant} />
        <Route path="*" component={FourOhFour} />
      </Route>
    </Router>
  </Provider>
);
