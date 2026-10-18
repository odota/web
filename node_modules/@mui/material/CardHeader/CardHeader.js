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
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _Typography = _interopRequireWildcard(require("../Typography"));
var _zeroStyled = require("../zero-styled");
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _cardHeaderClasses = _interopRequireWildcard(require("./cardHeaderClasses"));
var _useSlot = _interopRequireDefault(require("../utils/useSlot"));
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    avatar: ['avatar'],
    action: ['action'],
    content: ['content'],
    title: ['title'],
    subheader: ['subheader']
  };
  return (0, _composeClasses.default)(slots, _cardHeaderClasses.getCardHeaderUtilityClass, classes);
};
const CardHeaderRoot = (0, _zeroStyled.styled)('div', {
  name: 'MuiCardHeader',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{
      [`& .${_cardHeaderClasses.default.title}`]: styles.title
    }, {
      [`& .${_cardHeaderClasses.default.subheader}`]: styles.subheader
    }, styles.root];
  }
})({
  display: 'flex',
  alignItems: 'center',
  padding: 16
});
const CardHeaderAvatar = (0, _zeroStyled.styled)('div', {
  name: 'MuiCardHeader',
  slot: 'Avatar'
})({
  display: 'flex',
  flex: '0 0 auto',
  marginRight: 16
});
const CardHeaderAction = (0, _zeroStyled.styled)('div', {
  name: 'MuiCardHeader',
  slot: 'Action'
})({
  flex: '0 0 auto',
  alignSelf: 'flex-start',
  marginTop: -4,
  marginRight: -8,
  marginBottom: -4
});
const CardHeaderContent = (0, _zeroStyled.styled)('div', {
  name: 'MuiCardHeader',
  slot: 'Content'
})({
  flex: '1 1 auto',
  [`.${_Typography.typographyClasses.root}:where(& .${_cardHeaderClasses.default.title})`]: {
    display: 'block'
  },
  [`.${_Typography.typographyClasses.root}:where(& .${_cardHeaderClasses.default.subheader})`]: {
    display: 'block'
  }
});
const CardHeader = /*#__PURE__*/React.forwardRef(function CardHeader(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiCardHeader'
  });
  const {
    action,
    avatar,
    component = 'div',
    disableTypography = false,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    component,
    disableTypography
  };
  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      title: titleTypographyProps,
      subheader: subheaderTypographyProps,
      ...slotProps
    }
  };
  let title = titleProp;
  const [TitleSlot, titleSlotProps] = (0, _useSlot.default)('title', {
    className: classes.title,
    elementType: _Typography.default,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? 'body2' : 'h5',
      component: 'span'
    }
  });
  if (title != null && title.type !== _Typography.default && !disableTypography) {
    title = /*#__PURE__*/(0, _jsxRuntime.jsx)(TitleSlot, {
      ...titleSlotProps,
      children: title
    });
  }
  let subheader = subheaderProp;
  const [SubheaderSlot, subheaderSlotProps] = (0, _useSlot.default)('subheader', {
    className: classes.subheader,
    elementType: _Typography.default,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      variant: avatar ? 'body2' : 'body1',
      color: 'textSecondary',
      component: 'span'
    }
  });
  if (subheader != null && subheader.type !== _Typography.default && !disableTypography) {
    subheader = /*#__PURE__*/(0, _jsxRuntime.jsx)(SubheaderSlot, {
      ...subheaderSlotProps,
      children: subheader
    });
  }
  const [RootSlot, rootSlotProps] = (0, _useSlot.default)('root', {
    ref,
    className: classes.root,
    elementType: CardHeaderRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    ownerState
  });
  const [AvatarSlot, avatarSlotProps] = (0, _useSlot.default)('avatar', {
    className: classes.avatar,
    elementType: CardHeaderAvatar,
    externalForwardedProps,
    ownerState
  });
  const [ContentSlot, contentSlotProps] = (0, _useSlot.default)('content', {
    className: classes.content,
    elementType: CardHeaderContent,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = (0, _useSlot.default)('action', {
    className: classes.action,
    elementType: CardHeaderAction,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(RootSlot, {
    ...rootSlotProps,
    children: [avatar && /*#__PURE__*/(0, _jsxRuntime.jsx)(AvatarSlot, {
      ...avatarSlotProps,
      children: avatar
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(ContentSlot, {
      ...contentSlotProps,
      children: [title, subheader]
    }), action && /*#__PURE__*/(0, _jsxRuntime.jsx)(ActionSlot, {
      ...actionSlotProps,
      children: action
    })]
  });
});
process.env.NODE_ENV !== "production" ? CardHeader.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display in the card header.
   */
  action: _propTypes.default.node,
  /**
   * The Avatar element to display.
   */
  avatar: _propTypes.default.node,
  /**
   * @ignore
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * If `true`, `subheader` and `title` won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `title` text, and optional `subheader` text
   * with the Typography component.
   * @default false
   */
  disableTypography: _propTypes.default.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: _propTypes.default.shape({
    action: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    avatar: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    content: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    root: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    subheader: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    title: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: _propTypes.default.shape({
    action: _propTypes.default.elementType,
    avatar: _propTypes.default.elementType,
    content: _propTypes.default.elementType,
    root: _propTypes.default.elementType,
    subheader: _propTypes.default.elementType,
    title: _propTypes.default.elementType
  }),
  /**
   * The content of the component.
   */
  subheader: _propTypes.default.node,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.subheader` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  subheaderTypographyProps: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The content of the component.
   */
  title: _propTypes.default.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   * @deprecated Use `slotProps.title` instead. This prop will be removed in a future major release. See [Migrating from deprecated APIs](/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  titleTypographyProps: _propTypes.default.object
} : void 0;
var _default = exports.default = CardHeader;