"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useEnhancedEffect = _interopRequireDefault(require("@mui/utils/useEnhancedEffect"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _setRef = _interopRequireDefault(require("@mui/utils/setRef"));
var _getReactElementRef = _interopRequireDefault(require("@mui/utils/getReactElementRef"));
var _exactProp = _interopRequireDefault(require("@mui/utils/exactProp"));
var _HTMLElementType = _interopRequireDefault(require("@mui/utils/HTMLElementType"));
function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * Demos:
 *
 * - [Portal](https://mui.com/material-ui/react-portal/)
 *
 * API:
 *
 * - [Portal API](https://mui.com/material-ui/api/portal/)
 */
const Portal = /*#__PURE__*/React.forwardRef(function Portal(props, forwardedRef) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = (0, _useForkRef.default)(/*#__PURE__*/React.isValidElement(children) ? (0, _getReactElementRef.default)(children) : null, forwardedRef);
  (0, _useEnhancedEffect.default)(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  (0, _useEnhancedEffect.default)(() => {
    if (mountNode && !disablePortal) {
      (0, _setRef.default)(forwardedRef, mountNode);
      return () => {
        (0, _setRef.default)(forwardedRef, null);
      };
    }
    return undefined;
  }, [forwardedRef, mountNode, disablePortal]);
  if (disablePortal) {
    if (/*#__PURE__*/React.isValidElement(children)) {
      const newProps = {
        ref: handleRef
      };
      return /*#__PURE__*/React.cloneElement(children, newProps);
    }
    return children;
  }
  return mountNode ? /*#__PURE__*/ReactDOM.createPortal(children, mountNode) : mountNode;
});
process.env.NODE_ENV !== "production" ? Portal.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: _propTypes.default.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_HTMLElementType.default, _propTypes.default.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: _propTypes.default.bool
} : void 0;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = (0, _exactProp.default)(Portal.propTypes);
}
var _default = exports.default = Portal;