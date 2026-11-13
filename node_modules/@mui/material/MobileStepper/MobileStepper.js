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
var _integerPropType = _interopRequireDefault(require("@mui/utils/integerPropType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _Paper = _interopRequireDefault(require("../Paper"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _LinearProgress = _interopRequireDefault(require("../LinearProgress"));
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _slotShouldForwardProp = _interopRequireDefault(require("../styles/slotShouldForwardProp"));
var _mobileStepperClasses = require("./mobileStepperClasses");
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes,
    position
  } = ownerState;
  const slots = {
    root: ['root', `position${(0, _capitalize.default)(position)}`],
    dots: ['dots'],
    dot: ['dot'],
    dotActive: ['dotActive'],
    progress: ['progress']
  };
  return (0, _composeClasses.default)(slots, _mobileStepperClasses.getMobileStepperUtilityClass, classes);
};
const MobileStepperRoot = (0, _zeroStyled.styled)(_Paper.default, {
  name: 'MuiMobileStepper',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`position${(0, _capitalize.default)(ownerState.position)}`]];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: (theme.vars || theme).palette.background.default,
  padding: 8,
  variants: [{
    props: ({
      position
    }) => position === 'top' || position === 'bottom',
    style: {
      position: 'fixed',
      left: 0,
      right: 0,
      zIndex: (theme.vars || theme).zIndex.mobileStepper
    }
  }, {
    props: {
      position: 'top'
    },
    style: {
      top: 0
    }
  }, {
    props: {
      position: 'bottom'
    },
    style: {
      bottom: 0
    }
  }]
})));
const MobileStepperDots = (0, _zeroStyled.styled)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dots'
})({
  variants: [{
    props: {
      variant: 'dots'
    },
    style: {
      display: 'flex',
      flexDirection: 'row'
    }
  }]
});
const MobileStepperDot = (0, _zeroStyled.styled)('div', {
  name: 'MuiMobileStepper',
  slot: 'Dot',
  shouldForwardProp: prop => (0, _slotShouldForwardProp.default)(prop) && prop !== 'dotActive',
  overridesResolver: (props, styles) => {
    const {
      dotActive
    } = props;
    return [styles.dot, dotActive && styles.dotActive];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  variants: [{
    props: {
      variant: 'dots'
    },
    style: {
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest
      }),
      backgroundColor: (theme.vars || theme).palette.action.disabled,
      borderRadius: '50%',
      width: 8,
      height: 8,
      margin: '0 2px'
    }
  }, {
    props: {
      variant: 'dots',
      dotActive: true
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }]
})));
const MobileStepperProgress = (0, _zeroStyled.styled)(_LinearProgress.default, {
  name: 'MuiMobileStepper',
  slot: 'Progress'
})({
  variants: [{
    props: {
      variant: 'progress'
    },
    style: {
      width: '50%'
    }
  }]
});
const MobileStepper = /*#__PURE__*/React.forwardRef(function MobileStepper(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiMobileStepper'
  });
  const {
    activeStep = 0,
    backButton,
    className,
    LinearProgressProps,
    nextButton,
    position = 'bottom',
    steps,
    variant = 'dots',
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    activeStep,
    position,
    variant
  };
  let value;
  if (variant === 'progress') {
    if (steps === 1) {
      value = 100;
    } else {
      value = Math.ceil(activeStep / (steps - 1) * 100);
    }
  }
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      progress: LinearProgressProps,
      ...slotProps
    }
  };
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref,
    elementType: MobileStepperRoot,
    shouldForwardComponentProp: true,
    className: (0, _clsx.default)(classes.root, className),
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      square: true,
      elevation: 0
    }
  });
  const [DotsSlot, dotsSlotProps] = (0, _useSlot.default)('dots', {
    className: classes.dots,
    elementType: MobileStepperDots,
    externalForwardedProps,
    ownerState
  });
  const [DotSlot, dotSlotProps] = (0, _useSlot.default)('dot', {
    elementType: MobileStepperDot,
    externalForwardedProps,
    ownerState
  });
  const [ProgressSlot, progressSlotProps] = (0, _useSlot.default)('progress', {
    className: classes.progress,
    elementType: MobileStepperProgress,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      value,
      variant: 'determinate'
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RootSlot, {
    ...rootSlotProps,
    children: [backButton, variant === 'text' && /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
      children: [activeStep + 1, " / ", steps]
    }), variant === 'dots' && /*#__PURE__*/(0, _jsxRuntime.jsx)(DotsSlot, {
      ...dotsSlotProps,
      children: [...new Array(steps)].map((_, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(DotSlot, {
        ...dotSlotProps,
        className: (0, _clsx.default)(classes.dot, dotSlotProps.className, index === activeStep && classes.dotActive),
        dotActive: index === activeStep
      }, index))
    }), variant === 'progress' && /*#__PURE__*/(0, _jsxRuntime.jsx)(ProgressSlot, {
      ...progressSlotProps
    }), nextButton]
  });
});
process.env.NODE_ENV !== "production" ? MobileStepper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the active step (zero based index).
   * Defines which dot is highlighted when the variant is 'dots'.
   * @default 0
   */
  activeStep: _integerPropType.default,
  /**
   * A back button element. For instance, it can be a `Button` or an `IconButton`.
   */
  backButton: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * Props applied to the `LinearProgress` element.
   * @deprecated Use `slotProps.progress` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  LinearProgressProps: _propTypes.default.object,
  /**
   * A next button element. For instance, it can be a `Button` or an `IconButton`.
   */
  nextButton: _propTypes.default.node,
  /**
   * Set the positioning type.
   * @default 'bottom'
   */
  position: _propTypes.default.oneOf(['bottom', 'static', 'top']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    dot: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    dots: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    progress: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    dot: _propTypes.default.elementType,
    dots: _propTypes.default.elementType,
    progress: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  }),
  /**
   * The total steps.
   */
  steps: _integerPropType.default.isRequired,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The variant to use.
   * @default 'dots'
   */
  variant: _propTypes.default.oneOf(['dots', 'progress', 'text'])
} : void 0;
var _default = exports.default = MobileStepper;