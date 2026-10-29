"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getTablePaginationActionsUtilityClass = getTablePaginationActionsUtilityClass;
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
function getTablePaginationActionsUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiTablePaginationActions', slot);
}
const tablePaginationActionsClasses = (0, _generateUtilityClasses.default)('MuiTablePaginationActions', ['root']);
var _default = exports.default = tablePaginationActionsClasses;