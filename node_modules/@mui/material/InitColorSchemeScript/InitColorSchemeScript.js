"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConfig = exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _InitColorSchemeScript = _interopRequireDefault(require("@mui/system/InitColorSchemeScript"));
var _jsxRuntime = require("react/jsx-runtime");
const defaultConfig = exports.defaultConfig = {
  attribute: 'data-mui-color-scheme',
  colorSchemeStorageKey: 'mui-color-scheme',
  defaultLightColorScheme: 'light',
  defaultDarkColorScheme: 'dark',
  modeStorageKey: 'mui-mode'
};
/**
 *
 * Demos:
 *
 * - [InitColorSchemeScript](https://mui.com/material-ui/react-init-color-scheme-script/)
 *
 * API:
 *
 * - [InitColorSchemeScript API](https://mui.com/material-ui/api/init-color-scheme-script/)
 */
function InitColorSchemeScript(props) {
  const {
    defaultMode = 'system',
    defaultLightColorScheme = defaultConfig.defaultLightColorScheme,
    defaultDarkColorScheme = defaultConfig.defaultDarkColorScheme,
    modeStorageKey = defaultConfig.modeStorageKey,
    colorSchemeStorageKey = defaultConfig.colorSchemeStorageKey,
    attribute: initialAttribute = defaultConfig.attribute,
    colorSchemeNode = 'document.documentElement',
    nonce
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InitColorSchemeScript.default, {
    defaultMode: defaultMode,
    defaultLightColorScheme: defaultLightColorScheme,
    defaultDarkColorScheme: defaultDarkColorScheme,
    modeStorageKey: modeStorageKey,
    colorSchemeStorageKey: colorSchemeStorageKey,
    attribute: initialAttribute,
    colorSchemeNode: colorSchemeNode,
    nonce: nonce
  });
}
process.env.NODE_ENV !== "production" ? InitColorSchemeScript.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * DOM attribute for applying a color scheme.
   * @default 'data-mui-color-scheme'
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute: _propTypes.default.string,
  /**
   * The node (provided as string) used to attach the color-scheme attribute.
   * @default 'document.documentElement'
   */
  colorSchemeNode: _propTypes.default.string,
  /**
   * localStorage key used to store `colorScheme`.
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey: _propTypes.default.string,
  /**
   * The default color scheme to be used in dark mode.
   * @default 'dark'
   */
  defaultDarkColorScheme: _propTypes.default.string,
  /**
   * The default color scheme to be used in light mode.
   * @default 'light'
   */
  defaultLightColorScheme: _propTypes.default.string,
  /**
   * The default mode when the storage is empty (user's first visit).
   * @default 'system'
   */
  defaultMode: _propTypes.default.oneOf(['dark', 'light', 'system']),
  /**
   * localStorage key used to store `mode`.
   * @default 'mui-mode'
   */
  modeStorageKey: _propTypes.default.string,
  /**
   * Nonce string to pass to the inline script for CSP headers.
   */
  nonce: _propTypes.default.string
} : void 0;
var _default = exports.default = InitColorSchemeScript;