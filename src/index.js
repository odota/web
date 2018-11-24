/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import store from './store';
import { getMetadata, getStrings, getAbilities, getHeroAbilities, getNeutralAbilities, getAbilityIds } from './actions';
import App from './components/App';
// import { unregister } from './common/serviceWorker';

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
// Fetch strings
store.dispatch(getStrings());
store.dispatch(getAbilities());
store.dispatch(getHeroAbilities());
store.dispatch(getNeutralAbilities());
store.dispatch(getAbilityIds());

ReactGA.initialize('UA-55757642-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const history = createHistory();
history.listen((location) => {
  ReactGA.pageview(location.pathname);
});

const rootElement = document.getElementById('root');
const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>
);

if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}

// unregister();
