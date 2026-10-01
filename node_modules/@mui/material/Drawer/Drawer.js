"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAnchor = getAnchor;
exports.isHorizontal = isHorizontal;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _integerPropType = _interopRequireDefault(require("@mui/utils/integerPropType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _RtlProvider = require("@mui/system/RtlProvider");
var _Modal = _interopRequireDefault(require("../Modal"));
var _Slide = _interopRequireDefault(require("../Slide"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _rootShouldForwardProp = _interopRequireDefault(require("../styles/rootShouldForwardProp"));
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _drawerClasses = require("./drawerClasses");
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _utils = require("../utils");
var _jsxRuntime = require("react/jsx-runtime");
const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, (ownerState.variant === 'permanent' || ownerState.variant === 'persistent') && styles.docked, styles.modal];
};
const useUtilityClasses = ownerState => {
  const {
    classes,
    anchor,
    variant
  } = ownerState;
  const slots = {
    root: ['root', `anchor${(0, _capitalize.default)(anchor)}`],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: ['paper', `paperAnchor${(0, _capitalize.default)(anchor)}`, variant !== 'temporary' && `paperAnchorDocked${(0, _capitalize.default)(anchor)}`]
  };
  return (0, _composeClasses.default)(slots, _drawerClasses.getDrawerUtilityClass, classes);
};
const DrawerRoot = (0, _zeroStyled.styled)(_Modal.default, {
  name: 'MuiDrawer',
  slot: 'Root',
  overridesResolver
})((0, _memoTheme.default)(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.drawer
})));
const DrawerDockedRoot = (0, _zeroStyled.styled)('div', {
  shouldForwardProp: _rootShouldForwardProp.default,
  name: 'MuiDrawer',
  slot: 'Docked',
  skipVariantsResolver: false,
  overridesResolver
})({
  flex: '0 0 auto'
});
const DrawerPaper = (0, _zeroStyled.styled)(_Paper.default, {
  name: 'MuiDrawer',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.paper, styles[`paperAnchor${(0, _capitalize.default)(ownerState.anchor)}`], ownerState.variant !== 'temporary' && styles[`paperAnchorDocked${(0, _capitalize.default)(ownerState.anchor)}`]];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: '1 0 auto',
  zIndex: (theme.vars || theme).zIndex.drawer,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  // temporary style
  position: 'fixed',
  top: 0,
  // We disable the focus ring for mouse, touch and keyboard users.
  // At some point, it would be better to keep it for keyboard users.
  // :focus-ring CSS pseudo-class will help.
  outline: 0,
  variants: [{
    props: {
      anchor: 'left'
    },
    style: {
      left: 0
    }
  }, {
    props: {
      anchor: 'top'
    },
    style: {
      top: 0,
      left: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100%'
    }
  }, {
    props: {
      anchor: 'right'
    },
    style: {
      right: 0
    }
  }, {
    props: {
      anchor: 'bottom'
    },
    style: {
      top: 'auto',
      left: 0,
      bottom: 0,
      right: 0,
      height: 'auto',
      maxHeight: '100%'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchor === 'left' && ownerState.variant !== 'temporary',
    style: {
      borderRight: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchor === 'top' && ownerState.variant !== 'temporary',
    style: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchor === 'right' && ownerState.variant !== 'temporary',
    style: {
      borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchor === 'bottom' && ownerState.variant !== 'temporary',
    style: {
      borderTop: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }]
})));
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};
function isHorizontal(anchor) {
  return ['left', 'right'].includes(anchor);
}
function getAnchor({
  direction
}, anchor) {
  return direction === 'rtl' && isHorizontal(anchor) ? oppositeDirection[anchor] : anchor;
}

/**
 * The props of the [Modal](/material-ui/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
const Drawer = /*#__PURE__*/React.forwardRef(function Drawer(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiDrawer'
  });
  const theme = (0, _zeroStyled.useTheme)();
  const isRtl = (0, _RtlProvider.useRtl)();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    anchor: anchorProp = 'left',
    BackdropProps,
    children,
    className,
    elevation = 16,
    hideBackdrop = false,
    ModalProps: {
      BackdropProps: BackdropPropsProp,
      ...ModalProps
    } = {},
    onClose,
    open = false,
    PaperProps = {},
    SlideProps,
    // eslint-disable-next-line react/prop-types
    TransitionComponent,
    transitionDuration = defaultTransitionDuration,
    variant = 'temporary',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);
  const anchorInvariant = getAnchor({
    direction: isRtl ? 'rtl' : 'ltr'
  }, anchorProp);
  const anchor = anchorProp;
  const ownerState = {
    ...props,
    anchor,
    elevation,
    open,
    variant,
    ...other
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots: {
      transition: TransitionComponent,
      ...slots
    },
    slotProps: {
      paper: PaperProps,
      transition: SlideProps,
      ...slotProps,
      backdrop: (0, _utils.mergeSlotProps)(slotProps.backdrop || {
        ...BackdropProps,
        ...BackdropPropsProp
      }, {
        transitionDuration
      })
    }
  };
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref,
    elementType: DrawerRoot,
    className: (0, _clsx.default)(classes.root, classes.modal, className),
    shouldForwardComponentProp: true,
    ownerState,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      ...ModalProps
    },
    additionalProps: {
      open,
      onClose,
      hideBackdrop,
      slots: {
        backdrop: externalForwardedProps.slots.backdrop
      },
      slotProps: {
        backdrop: externalForwardedProps.slotProps.backdrop
      }
    }
  });
  const [PaperSlot, paperSlotProps] = (0, _useSlot.default)('paper', {
    elementType: DrawerPaper,
    shouldForwardComponentProp: true,
    className: (0, _clsx.default)(classes.paper, PaperProps.className),
    ownerState,
    externalForwardedProps,
    additionalProps: {
      elevation: variant === 'temporary' ? elevation : 0,
      square: true,
      ...(variant === 'temporary' && {
        role: 'dialog',
        'aria-modal': 'true'
      })
    }
  });
  const [DockedSlot, dockedSlotProps] = (0, _useSlot.default)('docked', {
    elementType: DrawerDockedRoot,
    ref,
    className: (0, _clsx.default)(classes.root, classes.docked, className),
    ownerState,
    externalForwardedProps,
    additionalProps: other // pass `other` here because `DockedSlot` is also a root slot for some variants
  });
  const [TransitionSlot, transitionSlotProps] = (0, _useSlot.default)('transition', {
    elementType: _Slide.default,
    ownerState,
    externalForwardedProps,
    additionalProps: {
      in: open,
      direction: oppositeDirection[anchorInvariant],
      timeout: transitionDuration,
      appear: mounted.current
    }
  });
  const drawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(PaperSlot, {
    ...paperSlotProps,
    children: children
  });
  if (variant === 'permanent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DockedSlot, {
      ...dockedSlotProps,
      children: drawer
    });
  }
  const slidingDrawer = /*#__PURE__*/(0, _jsxRuntime.jsx)(TransitionSlot, {
    ...transitionSlotProps,
    children: drawer
  });
  if (variant === 'persistent') {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(DockedSlot, {
      ...dockedSlotProps,
      children: slidingDrawer
    });
  }

  // variant === temporary
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(RootSlot, {
    ...rootSlotProps,
    children: slidingDrawer
  });
});
process.env.NODE_ENV !== "production" ? Drawer.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Side from which the drawer will appear.
   * @default 'left'
   */
  anchor: _propTypes.default.oneOf(['bottom', 'left', 'right', 'top']),
  /**
   * @ignore
   */
  BackdropProps: _propTypes.default.object,
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
   * The elevation of the drawer.
   * @default 16
   */
  elevation: _integerPropType.default,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: _propTypes.default.bool,
  /**
   * Props applied to the [`Modal`](https://mui.com/material-ui/api/modal/) element.
   * @default {}
   */
  ModalProps: _propTypes.default.object,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: _propTypes.default.func,
  /**
   * If `true`, the component is shown.
   * @default false
   */
  open: _propTypes.default.bool,
  /**
   * Props applied to the [`Paper`](https://mui.com/material-ui/api/paper/) element.
   * @deprecated use the `slotProps.paper` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   * @default {}
   */
  PaperProps: _propTypes.default.object,
  /**
   * Props applied to the [`Slide`](https://mui.com/material-ui/api/slide/) element.
   * @deprecated use the `slotProps.transition` prop instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  SlideProps: _propTypes.default.object,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    backdrop: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    docked: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    paper: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    transition: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    backdrop: _propTypes.default.elementType,
    docked: _propTypes.default.elementType,
    paper: _propTypes.default.elementType,
    root: _propTypes.default.elementType,
    transition: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),
  /**
   * The variant to use.
   * @default 'temporary'
   */
  variant: _propTypes.default.oneOf(['permanent', 'persistent', 'temporary'])
} : void 0;
var _default = exports.default = Drawer;