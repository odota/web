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
  d: "M12 2l-5.5 9h11z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17.5",
  cy: "17.5",
  r: "4.5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 13.5h8v8H3z"
})), 'CategorySharp');

exports.default = _default;