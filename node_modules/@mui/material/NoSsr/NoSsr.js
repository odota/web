"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));
var _exactProp = _interopRequireDefault(require("@mui/utils/exactProp"));
/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 *
 * * Escape hatch for broken dependencies not supporting SSR.
 * * Improve the time-to-first paint on the client by only rendering above the fold.
 * * Reduce the rendering time on the server.
 * * Under too heavy server load, you can turn on service degradation.
 *
 * Demos:
 *
 * - [No SSR](https://mui.com/material-ui/react-no-ssr/)
 *
 * API:
 *
 * - [NoSsr API](https://mui.com/material-ui/api/no-ssr/)
 */
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = React.useState(false);
  (0, _useEnhancedEffect.default)(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  // TODO casting won't be needed at one point https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65135
  return mountedState ? children : fallback;
}
process.env.NODE_ENV !== "production" ? NoSsr.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: _propTypes.default.node,
  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   * @default false
   */
  defer: _propTypes.default.bool,
  /**
   * The fallback content to display.
   * @default null
   */
  fallback: _propTypes.default.node
} : void 0;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  NoSsr['propTypes' + ''] = (0, _exactProp.default)(NoSsr.propTypes);
}
var _default = exports.default = NoSsr;