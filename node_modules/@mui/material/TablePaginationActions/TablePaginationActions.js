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
var _RtlProvider = require("@mui/system/RtlProvider");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _clsx = _interopRequireDefault(require("clsx"));
var _zeroStyled = require("../zero-styled");
var _DefaultPropsProvider = require("../DefaultPropsProvider");
var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));
var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));
var _IconButton = _interopRequireDefault(require("../IconButton"));
var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));
var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));
var _tablePaginationActionsClasses = require("./tablePaginationActionsClasses");
var _jsxRuntime = require("react/jsx-runtime");
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _composeClasses.default)(slots, _tablePaginationActionsClasses.getTablePaginationActionsUtilityClass, classes);
};
const TablePaginationActionsRoot = (0, _zeroStyled.styled)('div', {
  name: 'MuiTablePaginationActions',
  slot: 'Root'
})({});
const TablePaginationActions = /*#__PURE__*/React.forwardRef(function TablePaginationActions(inProps, ref) {
  const props = (0, _DefaultPropsProvider.useDefaultProps)({
    props: inProps,
    name: 'MuiTablePaginationActions'
  });
  const {
    backIconButtonProps,
    className,
    count,
    disabled = false,
    getItemAriaLabel,
    nextIconButtonProps,
    onPageChange,
    page,
    rowsPerPage,
    showFirstButton,
    showLastButton,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const isRtl = (0, _RtlProvider.useRtl)();
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = event => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = event => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  const FirstButton = slots.firstButton ?? _IconButton.default;
  const LastButton = slots.lastButton ?? _IconButton.default;
  const NextButton = slots.nextButton ?? _IconButton.default;
  const PreviousButton = slots.previousButton ?? _IconButton.default;
  const FirstButtonIcon = slots.firstButtonIcon ?? _FirstPage.default;
  const LastButtonIcon = slots.lastButtonIcon ?? _LastPage.default;
  const NextButtonIcon = slots.nextButtonIcon ?? _KeyboardArrowRight.default;
  const PreviousButtonIcon = slots.previousButtonIcon ?? _KeyboardArrowLeft.default;
  const FirstButtonSlot = isRtl ? LastButton : FirstButton;
  const PreviousButtonSlot = isRtl ? NextButton : PreviousButton;
  const NextButtonSlot = isRtl ? PreviousButton : NextButton;
  const LastButtonSlot = isRtl ? FirstButton : LastButton;
  const firstButtonSlotProps = isRtl ? slotProps.lastButton : slotProps.firstButton;
  const previousButtonSlotProps = isRtl ? slotProps.nextButton : slotProps.previousButton;
  const nextButtonSlotProps = isRtl ? slotProps.previousButton : slotProps.nextButton;
  const lastButtonSlotProps = isRtl ? slotProps.firstButton : slotProps.lastButton;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(TablePaginationActionsRoot, {
    ref: ref,
    className: (0, _clsx.default)(classes.root, className),
    ...other,
    children: [showFirstButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonSlot, {
      onClick: handleFirstPageButtonClick,
      disabled: disabled || page === 0,
      "aria-label": getItemAriaLabel('first', page),
      title: getItemAriaLabel('first', page),
      ...firstButtonSlotProps,
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonIcon, {
        ...slotProps.lastButtonIcon
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonIcon, {
        ...slotProps.firstButtonIcon
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonSlot, {
      onClick: handleBackButtonClick,
      disabled: disabled || page === 0,
      color: "inherit",
      "aria-label": getItemAriaLabel('previous', page),
      title: getItemAriaLabel('previous', page),
      ...(previousButtonSlotProps ?? backIconButtonProps),
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonIcon, {
        ...slotProps.nextButtonIcon
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonIcon, {
        ...slotProps.previousButtonIcon
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonSlot, {
      onClick: handleNextButtonClick,
      disabled: disabled || (count !== -1 ? page >= Math.ceil(count / rowsPerPage) - 1 : false),
      color: "inherit",
      "aria-label": getItemAriaLabel('next', page),
      title: getItemAriaLabel('next', page),
      ...(nextButtonSlotProps ?? nextIconButtonProps),
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PreviousButtonIcon, {
        ...slotProps.previousButtonIcon
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(NextButtonIcon, {
        ...slotProps.nextButtonIcon
      })
    }), showLastButton && /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonSlot, {
      onClick: handleLastPageButtonClick,
      disabled: disabled || page >= Math.ceil(count / rowsPerPage) - 1,
      "aria-label": getItemAriaLabel('last', page),
      title: getItemAriaLabel('last', page),
      ...lastButtonSlotProps,
      children: isRtl ? /*#__PURE__*/(0, _jsxRuntime.jsx)(FirstButtonIcon, {
        ...slotProps.firstButtonIcon
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(LastButtonIcon, {
        ...slotProps.lastButtonIcon
      })
    })]
  });
});
process.env.NODE_ENV !== "production" ? TablePaginationActions.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop is an alias for `slotProps.previousButton` and will be overridden by it if both are used.
   * @deprecated Use `slotProps.previousButton` instead.
   */
  backIconButtonProps: _propTypes.default.object,
  /**
   * @ignore
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
  count: _propTypes.default.number.isRequired,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @param {string} type The link or button type to format ('first' | 'last' | 'next' | 'previous').
   * @returns {string}
   */
  getItemAriaLabel: _propTypes.default.func.isRequired,
  /**
   * This prop is an alias for `slotProps.nextButton` and will be overridden by it if both are used.
   * @deprecated Use `slotProps.nextButton` instead.
   */
  nextIconButtonProps: _propTypes.default.object,
  /**
   * @ignore
   */
  onPageChange: _propTypes.default.func.isRequired,
  /**
   * @ignore
   */
  page: _propTypes.default.number.isRequired,
  /**
   * @ignore
   */
  rowsPerPage: _propTypes.default.number.isRequired,
  /**
   * @ignore
   */
  showFirstButton: _propTypes.default.bool.isRequired,
  /**
   * @ignore
   */
  showLastButton: _propTypes.default.bool.isRequired,
  /**
   * @ignore
   */
  slotProps: _propTypes.default.shape({
    firstButton: _propTypes.default.object,
    firstButtonIcon: _propTypes.default.object,
    lastButton: _propTypes.default.object,
    lastButtonIcon: _propTypes.default.object,
    nextButton: _propTypes.default.object,
    nextButtonIcon: _propTypes.default.object,
    previousButton: _propTypes.default.object,
    previousButtonIcon: _propTypes.default.object
  }),
  /**
   * @ignore
   */
  slots: _propTypes.default.shape({
    firstButton: _propTypes.default.elementType,
    firstButtonIcon: _propTypes.default.elementType,
    lastButton: _propTypes.default.elementType,
    lastButtonIcon: _propTypes.default.elementType,
    nextButton: _propTypes.default.elementType,
    nextButtonIcon: _propTypes.default.elementType,
    previousButton: _propTypes.default.elementType,
    previousButtonIcon: _propTypes.default.elementType
  })
} : void 0;
var _default = exports.default = TablePaginationActions;