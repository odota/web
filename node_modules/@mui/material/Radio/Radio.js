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
var _refType = _interopRequireDefault(require("@mui/utils/refType"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _SwitchBase = _interopRequireDefault(require("../internal/SwitchBase"));
var _RadioButtonIcon = _interopRequireDefault(require("./RadioButtonIcon"));
var _capitalize = _interopRequireDefault(require("../utils/capitalize"));
var _createChainedFunction = _interopRequireDefault(require("../utils/createChainedFunction"));
var _useFormControl = _interopRequireDefault(require("../FormControl/useFormControl"));
var _useRadioGroup = _interopRequireDefault(require("../RadioGroup/useRadioGroup"));
var _radioClasses = _interopRequireWildcard(require("./radioClasses"));
var _rootShouldForwardProp = _interopRequireDefault(require("../styles/rootShouldForwardProp"));
var _zeroStyled = require("../zero-styled");
var _memoTheme = _interopRequireDefault(require("../utils/memoTheme"));
var _createSimplePaletteValueFilter = _interopRequireDefault(require("../utils/createSimplePaletteValueFilter"));
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes,
    color,
    size
  } = ownerState;
  const slots = {
    root: ['root', `color${(0, _capitalize.default)(color)}`, size !== 'medium' && `size${(0, _capitalize.default)(size)}`]
  };
  return {
    ...classes,
    ...(0, _composeClasses.default)(slots, _radioClasses.getRadioUtilityClass, classes)
  };
};
const RadioRoot = (0, _zeroStyled.styled)(_SwitchBase.default, {
  shouldForwardProp: prop => (0, _rootShouldForwardProp.default)(prop) || prop === 'classes',
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.size !== 'medium' && styles[`size${(0, _capitalize.default)(ownerState.size)}`], styles[`color${(0, _capitalize.default)(ownerState.color)}`]];
  }
})((0, _memoTheme.default)(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  [`&.${_radioClasses.default.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled
  },
  variants: [{
    props: {
      color: 'default',
      disabled: false,
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter((0, _createSimplePaletteValueFilter.default)()).map(([color]) => ({
    props: {
      color,
      disabled: false,
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter((0, _createSimplePaletteValueFilter.default)()).map(([color]) => ({
    props: {
      color,
      disabled: false
    },
    style: {
      [`&.${_radioClasses.default.checked}`]: {
        color: (theme.vars || theme).palette[color].main
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      '&:hover': {
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  }]
})));
function areEqualValues(a, b) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}
const defaultCheckedIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {
  checked: true
});
const defaultIcon = /*#__PURE__*/(0, _jsxRuntime.jsx)(_RadioButtonIcon.default, {});
const Radio = /*#__PURE__*/React.forwardRef(function Radio(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiRadio'
  });
  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon = defaultIcon,
    name: nameProp,
    onChange: onChangeProp,
    size = 'medium',
    className,
    disabled: disabledProp,
    disableRipple = false,
    slots = {},
    slotProps = {},
    inputProps,
    ...other
  } = props;
  const muiFormControl = (0, _useFormControl.default)();
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }
  disabled ?? (disabled = false);
  const ownerState = {
    ...props,
    disabled,
    disableRipple,
    color,
    size
  };
  const classes = useUtilityClasses(ownerState);
  const radioGroup = (0, _useRadioGroup.default)();
  let checked = checkedProp;
  const onChange = (0, _createChainedFunction.default)(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;
  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = areEqualValues(radioGroup.value, props.value);
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }
  const externalInputProps = slotProps.input ?? inputProps;
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref,
    elementType: RadioRoot,
    className: (0, _clsx.default)(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other
    },
    getSlotProps: handlers => ({
      ...handlers,
      onChange: (event, ...args) => {
        handlers.onChange?.(event, ...args);
        onChange(event, ...args);
      }
    }),
    ownerState,
    additionalProps: {
      type: 'radio',
      icon: /*#__PURE__*/React.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size
      }),
      checkedIcon: /*#__PURE__*/React.cloneElement(checkedIcon, {
        fontSize: checkedIcon.props.fontSize ?? size
      }),
      disabled,
      name,
      checked,
      slots,
      slotProps: {
        // Do not forward `slotProps.root` again because it's already handled by the `RootSlot` in this file.
        input: typeof externalInputProps === 'function' ? externalInputProps(ownerState) : externalInputProps
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(RootSlot, {
    ...rootSlotProps,
    classes: classes
  });
});
process.env.NODE_ENV !== "production" ? Radio.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: _propTypes.default.bool,
  /**
   * The icon to display when the component is checked.
   * @default <RadioButtonIcon checked />
   */
  checkedIcon: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),
  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: _propTypes.default.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <RadioButtonIcon />
   */
  icon: _propTypes.default.node,
  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input#attributes) applied to the `input` element.
   * @deprecated Use `slotProps.input` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputProps: _propTypes.default.object,
  /**
   * Pass a ref to the `input` element.
   * @deprecated Use `slotProps.input.ref` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  inputRef: _refType.default,
  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: _propTypes.default.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: _propTypes.default.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['medium', 'small']), _propTypes.default.string]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    input: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    input: _propTypes.default.elementType,
    root: _propTypes.default.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: _propTypes.default.any
} : void 0;
var _default = exports.default = Radio;