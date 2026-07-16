"use strict";
'use client';

// @inheritedComponent Tooltip
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
var _colorManipulator = require("@mui/system/colorManipulator");
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _Fab = _interopRequireDefault(require("../Fab"));
var _Tooltip = _interopRequireDefault(require("../Tooltip"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _speedDialActionClasses = _interopRequireWildcard(require("./speedDialActionClasses"));
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    open,
    tooltipPlacement,
    classes
  } = ownerState;
  const slots = {
    fab: ['fab', !open && 'fabClosed'],
    staticTooltip: ['staticTooltip', `tooltipPlacement${(0, _capitalize.default)(tooltipPlacement)}`, !open && 'staticTooltipClosed'],
    staticTooltipLabel: ['staticTooltipLabel']
  };
  return (0, _composeClasses.default)(slots, _speedDialActionClasses.getSpeedDialActionUtilityClass, classes);
};
const SpeedDialActionFab = (0, _zeroStyled.styled)(_Fab.default, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.fab, !ownerState.open && styles.fabClosed];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  margin: 8,
  color: (theme.vars || theme).palette.text.secondary,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: theme.vars ? theme.vars.palette.SpeedDialAction.fabHoverBg : (0, _colorManipulator.emphasize)(theme.palette.background.paper, 0.15)
  },
  transition: `${theme.transitions.create('transform', {
    duration: theme.transitions.duration.shorter
  })}, opacity 0.8s`,
  opacity: 1,
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.open,
    style: {
      opacity: 0,
      transform: 'scale(0)'
    }
  }]
})));
const SpeedDialActionStaticTooltip = (0, _zeroStyled.styled)('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltip',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.staticTooltip, !ownerState.open && styles.staticTooltipClosed, styles[`tooltipPlacement${(0, _capitalize.default)(ownerState.tooltipPlacement)}`]];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [`& .${_speedDialActionClasses.default.staticTooltipLabel}`]: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.shorter
    }),
    opacity: 1
  },
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.open,
    style: {
      [`& .${_speedDialActionClasses.default.staticTooltipLabel}`]: {
        opacity: 0,
        transform: 'scale(0.5)'
      }
    }
  }, {
    props: {
      tooltipPlacement: 'left'
    },
    style: {
      [`& .${_speedDialActionClasses.default.staticTooltipLabel}`]: {
        transformOrigin: '100% 50%',
        right: '100%',
        marginRight: 8
      }
    }
  }, {
    props: {
      tooltipPlacement: 'right'
    },
    style: {
      [`& .${_speedDialActionClasses.default.staticTooltipLabel}`]: {
        transformOrigin: '0% 50%',
        left: '100%',
        marginLeft: 8
      }
    }
  }]
})));
const SpeedDialActionStaticTooltipLabel = (0, _zeroStyled.styled)('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltipLabel'
})((0, _memoTheme.default)(({
  theme
}) => ({
  position: 'absolute',
  ...theme.typography.body1,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  boxShadow: (theme.vars || theme).shadows[1],
  color: (theme.vars || theme).palette.text.secondary,
  padding: '4px 16px',
  wordBreak: 'keep-all'
})));
const SpeedDialAction = /*#__PURE__*/React.forwardRef(function SpeedDialAction(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiSpeedDialAction'
  });
  const {
    className,
    delay = 0,
    FabProps = {},
    icon,
    id,
    open,
    TooltipClasses,
    tooltipOpen: tooltipOpenProp = false,
    tooltipPlacement = 'left',
    tooltipTitle,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    tooltipPlacement
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      fab: FabProps,
      ...slotProps,
      tooltip: (0, _utils.mergeSlotProps)(typeof slotProps.tooltip === 'function' ? slotProps.tooltip(ownerState) : slotProps.tooltip, {
        title: tooltipTitle,
        open: tooltipOpenProp,
        placement: tooltipPlacement,
        classes: TooltipClasses
      })
    }
  };
  const [tooltipOpen, setTooltipOpen] = React.useState(externalForwardedProps.slotProps.tooltip?.open);
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };
  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };
  const transitionStyle = {
    transitionDelay: `${delay}ms`
  };
  const [FabSlot, fabSlotProps] = (0, _useSlot.default)('fab', {
    elementType: SpeedDialActionFab,
    externalForwardedProps,
    ownerState,
    shouldForwardComponentProp: true,
    className: (0, _clsx.default)(classes.fab, className),
    additionalProps: {
      style: transitionStyle,
      tabIndex: -1,
      role: 'menuitem',
      size: 'small'
    }
  });
  const [TooltipSlot, tooltipSlotProps] = (0, _useSlot.default)('tooltip', {
    elementType: _Tooltip.default,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ref,
    additionalProps: {
      id
    },
    ownerState,
    getSlotProps: handlers => ({
      ...handlers,
      onClose: event => {
        handlers.onClose?.(event);
        handleTooltipClose();
      },
      onOpen: event => {
        handlers.onOpen?.(event);
        handleTooltipOpen();
      }
    })
  });
  const [StaticTooltipSlot, staticTooltipSlotProps] = (0, _useSlot.default)('staticTooltip', {
    elementType: SpeedDialActionStaticTooltip,
    externalForwardedProps,
    ownerState,
    ref,
    className: classes.staticTooltip,
    additionalProps: {
      id
    }
  });
  const [StaticTooltipLabelSlot, staticTooltipLabelSlotProps] = (0, _useSlot.default)('staticTooltipLabel', {
    elementType: SpeedDialActionStaticTooltipLabel,
    externalForwardedProps,
    ownerState,
    className: classes.staticTooltipLabel,
    additionalProps: {
      style: transitionStyle,
      id: `${id}-label`
    }
  });
  const fab = /*#__PURE__*/(0, _jsxRuntime.jsx)(FabSlot, {
    ...fabSlotProps,
    children: icon
  });
  if (tooltipSlotProps.open) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(StaticTooltipSlot, {
      ...staticTooltipSlotProps,
      ...other,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(StaticTooltipLabelSlot, {
        ...staticTooltipLabelSlotProps,
        children: tooltipSlotProps.title
      }), /*#__PURE__*/React.cloneElement(fab, {
        'aria-labelledby': `${id}-label`
      })]
    });
  }
  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TooltipSlot, {
    ...tooltipSlotProps,
    title: tooltipSlotProps.title,
    open: open && tooltipOpen,
    placement: tooltipSlotProps.placement,
    classes: tooltipSlotProps.classes,
    ...other,
    children: fab
  });
});
process.env.NODE_ENV !== "production" ? SpeedDialAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: _propTypes.default.number,
  /**
   * Props applied to the [`Fab`](https://mui.com/material-ui/api/fab/) component.
   * @default {}
   * @deprecated Use `slotProps.fab` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  FabProps: _propTypes.default.object,
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: _propTypes.default.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: _propTypes.default.string,
  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    fab: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    staticTooltip: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    staticTooltipLabel: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    tooltip: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    fab: _propTypes.default.elementType,
    staticTooltip: _propTypes.default.elementType,
    staticTooltipLabel: _propTypes.default.elementType,
    tooltip: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * `classes` prop applied to the [`Tooltip`](https://mui.com/material-ui/api/tooltip/) element.
   * @deprecated Use `slotProps.tooltip.classes` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  TooltipClasses: _propTypes.default.object,
  /**
   * Make the tooltip always visible when the SpeedDial is open.
   * @default false
   * @deprecated Use `slotProps.tooltip.open` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipOpen: _propTypes.default.bool,
  /**
   * Placement of the tooltip.
   * @default 'left'
   * @deprecated Use `slotProps.tooltip.placement` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipPlacement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
  /**
   * Label to display in the tooltip.
   * @deprecated Use `slotProps.tooltip.title` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  tooltipTitle: _propTypes.default.node
} : void 0;
var _default = exports.default = SpeedDialAction;