import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RouterWithProvider from 'components/Router';
import store from 'store';
import { getMetadata } from 'actions';

// Import css for webpack to load
import 'c3/c3.css';
import './index.css';

// Promise polyfill for IE used by fetch
require('es6-promise').polyfill();
// This is used by material-ui components
injectTapEventPlugin();

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());

const reactElement = document.getElementById('react');
render(<RouterWithProvider />, reactElement);
