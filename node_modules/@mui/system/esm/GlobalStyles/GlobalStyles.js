'use client';

import PropTypes from 'prop-types';
import { GlobalStyles as MuiGlobalStyles, internal_serializeStyles as serializeStyles } from '@mui/styled-engine';
import useTheme from "../useTheme/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
function wrapGlobalLayer(styles) {
  const serialized = serializeStyles(styles);
  if (styles !== serialized && serialized.styles) {
    if (!serialized.styles.match(/^@layer\s+[^{]*$/)) {
      // If the styles are not already wrapped in a layer, wrap them in a global layer.
      serialized.styles = `@layer global{${serialized.styles}}`;
    }
    return serialized;
  }
  return styles;
}
function GlobalStyles({
  styles,
  themeId,
  defaultTheme = {}
}) {
  const upperTheme = useTheme(defaultTheme);
  const resolvedTheme = themeId ? upperTheme[themeId] || upperTheme : upperTheme;
  let globalStyles = typeof styles === 'function' ? styles(resolvedTheme) : styles;
  if (resolvedTheme.modularCssLayers) {
    if (Array.isArray(globalStyles)) {
      globalStyles = globalStyles.map(styleArg => {
        if (typeof styleArg === 'function') {
          return wrapGlobalLayer(styleArg(resolvedTheme));
        }
        return wrapGlobalLayer(styleArg);
      });
    } else {
      globalStyles = wrapGlobalLayer(globalStyles);
    }
  }
  return /*#__PURE__*/_jsx(MuiGlobalStyles, {
    styles: globalStyles
  });
}
process.env.NODE_ENV !== "production" ? GlobalStyles.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: PropTypes.object,
  /**
   * @ignore
   */
  styles: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([PropTypes.array, PropTypes.func, PropTypes.number, PropTypes.object, PropTypes.string, PropTypes.bool]),
  /**
   * @ignore
   */
  themeId: PropTypes.string
} : void 0;
export default GlobalStyles;