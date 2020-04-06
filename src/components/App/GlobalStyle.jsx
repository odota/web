import { createGlobalStyle } from 'styled-components';
import constants from '../constants';

const GlobalStyle = createGlobalStyle([
  `
body {
  align-items: initial;
  background-color: initial;
  display: block;
  font-family: ${constants.fontFamily};
  height: initial;
  justify-content: initial;
  margin: 0;
  padding-right: 0 !important;
  text-align: initial;
  width: initial;
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
  background-color: #192023;
  background-image: -webkit-linear-gradient(to right, #1a2b3e, #141E30);
  background-image: linear-gradient(to right, #1a2b3e, #141E30);
  color: ${constants.primaryTextColor};
  height: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  padding-top: 56px;
}

[data-tip] {
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

table {
  border-collapse: collapse;
  border-spacing: 0px;
  width: 100%;
}

td {
  font-size: 13px;
  text-align: left;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 5px;
  padding-bottom: 5px;
}

th {
  height: 38px;
  font-weight: normal;
  font-size: 12px;
  text-align: left;
  padding-left: 24px;
  padding-right: 24px;
}
`,
]);

export default GlobalStyle;
