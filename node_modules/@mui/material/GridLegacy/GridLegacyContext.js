"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
/**
 * @ignore - internal component.
 */
const GridLegacyContext = /*#__PURE__*/React.createContext();
if (process.env.NODE_ENV !== 'production') {
  GridLegacyContext.displayName = 'GridLegacyContext';
}
var _default = exports.default = GridLegacyContext;