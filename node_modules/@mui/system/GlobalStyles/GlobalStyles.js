"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledEngine = require("@mui/styled-engine");
var _useTheme = _interopRequireDefault(require("../useTheme"));
var _jsxRuntime = require("react/jsx-runtime");
function wrapGlobalLayer(styles) {
  const serialized = (0, _styledEngine.internal_serializeStyles)(styles);
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
  const upperTheme = (0, _useTheme.default)(defaultTheme);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_styledEngine.GlobalStyles, {
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
  defaultTheme: _propTypes.default.object,
  /**
   * @ignore
   */
  styles: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.array, _propTypes.default.func, _propTypes.default.number, _propTypes.default.object, _propTypes.default.string, _propTypes.default.bool]),
  /**
   * @ignore
   */
  themeId: _propTypes.default.string
} : void 0;
var _default = exports.default = GlobalStyles;