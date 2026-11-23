'use client';

import * as React from 'react';
import ThemeProviderNoVars from "./ThemeProviderNoVars.js";
import { CssVarsProvider } from "./ThemeProviderWithVars.js";
import THEME_ID from "./identifier.js";
import { jsx as _jsx } from "react/jsx-runtime";
export default function ThemeProvider({
  theme,
  ...props
}) {
  const noVarsTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }
    const muiTheme = THEME_ID in theme ? theme[THEME_ID] : theme;
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
    return /*#__PURE__*/_jsx(ThemeProviderNoVars, {
      theme: noVarsTheme,
      ...props
    });
  }
  return /*#__PURE__*/_jsx(CssVarsProvider, {
    theme: theme,
    ...props
  });
}