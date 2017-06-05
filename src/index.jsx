import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import store from 'store';
import { getMetadata } from 'actions';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from 'components/App';

// Import global CSS
import 'c3/c3.css';
import 'components/tooltip.css';
import './index.css';

// TODO this is used by material-ui, but we should remove when possible.
injectTapEventPlugin();

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());

const reactElement = document.getElementById('react');
render(<Provider store={store}>
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
</Provider>, reactElement);
