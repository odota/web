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
var _clsx = _interopRequireDefault(require("clsx"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _cardActionAreaClasses = _interopRequireWildcard(require("./cardActionAreaClasses"));
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight']
  };
  return (0, _composeClasses.default)(slots, _cardActionAreaClasses.getCardActionAreaUtilityClass, classes);
};
const CardActionAreaRoot = (0, _zeroStyled.styled)(_ButtonBase.default, {
  name: 'MuiCardActionArea',
  slot: 'Root'
})((0, _memoTheme.default)(({
  theme
}) => ({
  display: 'block',
  textAlign: 'inherit',
  borderRadius: 'inherit',
  // for Safari to work https://github.com/mui/material-ui/issues/36285.
  width: '100%',
  [`&:hover .${_cardActionAreaClasses.default.focusHighlight}`]: {
    opacity: (theme.vars || theme).palette.action.hoverOpacity,
    '@media (hover: none)': {
      opacity: 0
    }
  },
  [`&.${_cardActionAreaClasses.default.focusVisible} .${_cardActionAreaClasses.default.focusHighlight}`]: {
    opacity: (theme.vars || theme).palette.action.focusOpacity
  }
})));
const CardActionAreaFocusHighlight = (0, _zeroStyled.styled)('span', {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight'
})((0, _memoTheme.default)(({
  theme
}) => ({
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
  opacity: 0,
  backgroundColor: 'currentcolor',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short
  })
})));
const CardActionArea = /*#__PURE__*/React.forwardRef(function CardActionArea(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiCardActionArea'
  });
  const {
    children,
    className,
    focusVisibleClassName,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootProps] = (0, _useSlot.default)('root', {
    elementType: CardActionAreaRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    shouldForwardComponentProp: true,
    ownerState,
    ref,
    className: (0, _clsx.default)(classes.root, className),
    additionalProps: {
      focusVisibleClassName: (0, _clsx.default)(focusVisibleClassName, classes.focusVisible)
    }
  });
  const [FocusHighlightSlot, focusHighlightProps] = (0, _useSlot.default)('focusHighlight', {
    elementType: CardActionAreaFocusHighlight,
    externalForwardedProps,
    ownerState,
    ref,
    className: classes.focusHighlight
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RootSlot, {
    ...rootProps,
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(FocusHighlightSlot, {
      ...focusHighlightProps
    })]
  });
});
process.env.NODE_ENV !== "production" ? CardActionArea.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    focusHighlight: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    focusHighlight: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = CardActionArea;