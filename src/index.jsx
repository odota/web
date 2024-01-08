/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createBrowserHistory } from 'history';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import store from './store';
import { getMetadata, getStrings } from './actions';
import App from './components/App';
// import { unregister } from './common/serviceWorker';

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
// Fetch strings
store.dispatch(getStrings());

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'production') {
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
