/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createBrowserHistory } from 'history';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { getMetadata, getStrings, getAbilities, getHeroAbilities, getHeroAghs, getNeutralAbilities, getAbilityIds } from './actions';
import App from './components/App';
// import { unregister } from './common/serviceWorker';

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
// Fetch strings
store.dispatch(getStrings());
store.dispatch(getAbilities());
store.dispatch(getHeroAbilities());
store.dispatch(getHeroAghs());
store.dispatch(getNeutralAbilities());
store.dispatch(getAbilityIds());

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'production') {
  const ReactGA = require('react-ga'); // eslint-disable-line global-require
  ReactGA.initialize('UA-55757642-1');
  ReactGA.pageview(window.location.pathname + window.location.search);

  history.listen((location) => {
    ReactGA.pageview(location.pathname);
  });
}

const rootElement = document.getElementById('root');

const app = (
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
);

if (rootElement.hasChildNodes()) {
  hydrate(app, rootElement);
} else {
  render(app, rootElement);
}

// Remove loader
const loader = document.getElementById('loader');
if (loader) {
  loader.remove();
}

// unregister();
