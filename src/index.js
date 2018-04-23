/* eslint-disable react/jsx-filename-extension */
import 'core-js/fn/object/values';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import store from './store';
import { getMetadata, getStrings, getAbilities, getNeutralAbilities, getAbilityIds } from './actions';
import App from './components/App';
import constants from './components/constants';
import registerServiceWorker from './registerServiceWorker';
//import { unregister } from './registerServiceWorker';

// Inject global styles
injectGlobal([`
body {
  background-color: initial;
  text-align: initial;
  display: initial;
  justify-content: initial;
  align-items: initial;
  height: initial;
  width: initial;
  margin: 0;
  font-family: ${constants.fontFamily};
}

a {
  color: ${constants.primaryLinkColor};
  text-decoration: none;
  transition: ${constants.normalTransition};

  &:hover {
    color: color(${constants.primaryLinkColor} lightness(-33%));
  }
}

li {
  list-style-type: none;
}

#root {
  height: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  background-color: #192023;
  background-image: -webkit-linear-gradient(315deg, #2e2d45, #1c2127);
  background-image: linear-gradient(135deg, #2e2d45, #1c2127);
  color: ${constants.primaryTextColor};
}

[data-tip="true"] {
  cursor: help;
}

[data-id="tooltip"] {
  padding: 8px 12px !important;
  border-radius: 2px !important;
  background-color: ${constants.almostBlack} !important;
  color: ${constants.textColorPrimary} !important;
  white-space: pre-wrap;
  line-height: 1.5 !important;
  text-align: left;
  margin: -3px !important;

  &:matches(::after, ::before) {
    content: none !important;
  }
}

@keyframes tooltip-appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

[data-hint] {
  &::before,
  &::after {
    position: absolute;
    display: inline-block;
    opacity: 0;
    z-index: 10000;
    pointer-events: none;
  }

  &::before {
    content: "";
    width: 0;
    height: 0;
  }

  &::after {
    content: attr(data-hint);
    background-color: ${constants.almostBlack};
    color: ${constants.textColorPrimary};
    border-radius: 2px;
    padding: 5px 8px;
    font-weight: ${constants.fontWeightLight};
    text-transform: none;
    font-size: 13px;
    line-height: 1.3;
    white-space: nowrap;
  }

  &:hover {
    cursor: help;

    &::before,
    &::after {
      animation-name: tooltip-appear;
      animation-duration: 0.1s;
      animation-fill-mode: forwards;
      animation-timing-function: ease-in;
      animation-delay: 0.4s;
    }
  }
}

[data-hint-position="top"] {
  &::after {
    bottom: 100%;
    margin-bottom: 3px;
    margin-left: -24px;
  }

  &::before {
    border-style: solid;
    border-width: 3px 6px 0 6px;
    border-color: ${constants.almostBlack} transparent transparent transparent;
    top: -3px;
  }
}

[data-hint-position="bottom"] {
  &::after {
    top: 100%;
    margin-top: 3px;
    margin-left: -24px;
  }

  &::before {
    border-style: solid;
    border-width: 0 6px 3px 6px;
    border-color: transparent transparent ${constants.almostBlack} transparent;
    bottom: -3px;
  }
}
`]);

// Fetch metadata (used on all pages)
store.dispatch(getMetadata());
// Fetch strings
store.dispatch(getStrings());
store.dispatch(getAbilities());
store.dispatch(getNeutralAbilities());
store.dispatch(getAbilityIds());

ReactGA.initialize('UA-55757642-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const history = createHistory();
history.listen((location) => {
  ReactGA.pageview(location.pathname);
});

firebase.initializeApp({
  messagingSenderId: "94888484309"
});

const messaging = firebase.messaging();

messaging.usePublicVapidKey('BKps08hUYwudXP-OYfzASjwSHTWtelpAzu6_M44YuTaaoKE_UNoo2WqDSnaEqBM3mH5dKNeK4hok9zDBfCGHGzQ');

messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
});

// Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    console.log(currentToken);
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
  } else {
    // Show permission request.
    console.log('No Instance ID token available. Request permission to generate one.');
    // Show permission UI.
    // updateUIForPushPermissionRequired();
    // setTokenSentToServer(false);
  }
}).catch(function(err) {
  console.log('An error occurred while retrieving token. ', err);
  // showToken('Error retrieving Instance ID token. ', err);
  // setTokenSentToServer(false);
});

messaging.onTokenRefresh(function() {
  messaging.getToken().then(function(refreshedToken) {
    console.log('Token refreshed.');
    // Indicate that the new Instance ID token has not yet been sent to the
    // app server.
    // setTokenSentToServer(false);
    // // Send Instance ID token to app server.
    // sendTokenToServer(refreshedToken);
    console.log('this is the token');
    console.log(refreshedToken);
    // ...
  }).catch(function(err) {
    console.log('Unable to retrieve refreshed token ', err);
  });
});

  
const rootElement = document.getElementById('root');
const app = (
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>);
if (rootElement.hasChildNodes()) {
  render(app, rootElement);
} else {
  hydrate(app, rootElement);
}
registerServiceWorker();
//unregister();
// document.getElementById('loader').style.display = 'none';
