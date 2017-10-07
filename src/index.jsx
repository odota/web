import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import store from 'store';
import { getMetadata } from 'actions';
import App from 'components/App';
import constants from 'components/constants';
import { injectGlobal } from 'styled-components';

// Inject global styles
injectGlobal([`
body {
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

#react {
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

const reactElement = document.getElementById('react');
render(<Provider store={store}>
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
</Provider>, reactElement);
