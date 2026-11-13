"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useMediaQuery = require("@mui/system/useMediaQuery");
var _identifier = _interopRequireDefault(require("../styles/identifier"));
const useMediaQuery = (0, _useMediaQuery.unstable_createUseMediaQuery)({
  themeId: _identifier.default
});
var _default = exports.default = useMediaQuery;