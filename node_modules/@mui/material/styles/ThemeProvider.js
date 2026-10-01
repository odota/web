"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ThemeProvider;
var React = _interopRequireWildcard(require("react"));
var _ThemeProviderNoVars = _interopRequireDefault(require("./ThemeProviderNoVars"));
var _ThemeProviderWithVars = require("./ThemeProviderWithVars");
var _identifier = _interopRequireDefault(require("./identifier"));
var _jsxRuntime = require("react/jsx-runtime");
function ThemeProvider({
  theme,
  ...props
}) {
  const noVarsTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }
    const muiTheme = _identifier.default in theme ? theme[_identifier.default] : theme;
    if (!('colorSchemes' in muiTheme)) {
      if (!('vars' in muiTheme)) {
        // For non-CSS variables themes, set `vars` to null to prevent theme inheritance from the upper theme.
        // The example use case is the docs demo that uses ThemeProvider to customize the theme while the upper theme is using CSS variables.
        return {
          ...theme,
          vars: null
        };
      }
      return theme;
    }
    return null;
  }, [theme]);
  if (noVarsTheme) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeProviderNoVars.default, {
      theme: noVarsTheme,
      ...props
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeProviderWithVars.CssVarsProvider, {
    theme: theme,
    ...props
  });
}