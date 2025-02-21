"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _createSvgIcon = _interopRequireDefault(require("./utils/createSvgIcon"));

var _default = (0, _createSvgIcon.default)( /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M15.5 5H11l5 7-5 7h4.5l5-7z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8.5 5H4l5 7-5 7h4.5l5-7z"
})), 'DoubleArrowTwoTone');

exports.default = _default;