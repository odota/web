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
var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));
var _AccordionContext = _interopRequireDefault(require("../Accordion/AccordionContext"));
var _accordionSummaryClasses = _interopRequireWildcard(require("./accordionSummaryClasses"));
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes,
    expanded,
    disabled,
    disableGutters
  } = ownerState;
  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded']
  };
  return (0, _composeClasses.default)(slots, _accordionSummaryClasses.getAccordionSummaryUtilityClass, classes);
};
const AccordionSummaryRoot = (0, _zeroStyled.styled)(_ButtonBase.default, {
  name: 'MuiAccordionSummary',
  slot: 'Root'
})((0, _memoTheme.default)(({
  theme
}) => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    display: 'flex',
    width: '100%',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition),
    [`&.${_accordionSummaryClasses.default.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus
    },
    [`&.${_accordionSummaryClasses.default.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity
    },
    [`&:hover:not(.${_accordionSummaryClasses.default.disabled})`]: {
      cursor: 'pointer'
    },
    variants: [{
      props: props => !props.disableGutters,
      style: {
        [`&.${_accordionSummaryClasses.default.expanded}`]: {
          minHeight: 64
        }
      }
    }]
  };
}));
const AccordionSummaryContent = (0, _zeroStyled.styled)('span', {
  name: 'MuiAccordionSummary',
  slot: 'Content'
})((0, _memoTheme.default)(({
  theme
}) => ({
  display: 'flex',
  textAlign: 'start',
  flexGrow: 1,
  margin: '12px 0',
  variants: [{
    props: props => !props.disableGutters,
    style: {
      transition: theme.transitions.create(['margin'], {
        duration: theme.transitions.duration.shortest
      }),
      [`&.${_accordionSummaryClasses.default.expanded}`]: {
        margin: '20px 0'
      }
    }
  }]
})));
const AccordionSummaryExpandIconWrapper = (0, _zeroStyled.styled)('span', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper'
})((0, _memoTheme.default)(({
  theme
}) => ({
  display: 'flex',
  color: (theme.vars || theme).palette.action.active,
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  [`&.${_accordionSummaryClasses.default.expanded}`]: {
    transform: 'rotate(180deg)'
  }
})));
const AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiAccordionSummary'
  });
  const {
    children,
    className,
    expandIcon,
    focusVisibleClassName,
    onClick,
    slots,
    slotProps,
    ...other
  } = props;
  const {
    disabled = false,
    disableGutters,
    expanded,
    toggle
  } = React.useContext(_AccordionContext.default);
  const handleChange = event => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const ownerState = {
    ...props,
    expanded,
    disabled,
    disableGutters
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps
  };
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref,
    shouldForwardComponentProp: true,
    className: (0, _clsx.default)(classes.root, className),
    elementType: AccordionSummaryRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      focusRipple: false,
      disableRipple: true,
      disabled,
      'aria-expanded': expanded,
      focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName)
    },
    getSlotProps: handlers => ({
      ...handlers,
      onClick: event => {
        handlers.onClick?.(event);
        handleChange(event);
      }
    })
  });
  const [ContentSlot, contentSlotProps] = (0, _useSlot.default)('content', {
    className: classes.content,
    elementType: AccordionSummaryContent,
    externalForwardedProps,
    ownerState
  });
  const [ExpandIconWrapperSlot, expandIconWrapperSlotProps] = (0, _useSlot.default)('expandIconWrapper', {
    className: classes.expandIconWrapper,
    elementType: AccordionSummaryExpandIconWrapper,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RootSlot, {
    ...rootSlotProps,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(ContentSlot, {
      ...contentSlotProps,
      children: children
    }), expandIcon && /*#__PURE__*/(0, _jsxRuntime.jsx)(ExpandIconWrapperSlot, {
      ...expandIconWrapperSlotProps,
      children: expandIcon
    })]
  });
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes /* remove-proptypes */ = {
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
   * The icon to display as the expand indicator.
   */
  expandIcon: _propTypes.default.node,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: _propTypes.default.string,
  /**
   * @ignore
   */
  onClick: _propTypes.default.func,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    content: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    expandIconWrapper: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    content: _propTypes.default.elementType,
    expandIconWrapper: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;
var _default = exports.default = AccordionSummary;