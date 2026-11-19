"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  gridLegacyClasses: true
};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _GridLegacy.default;
  }
});
Object.defineProperty(exports, "gridLegacyClasses", {
  enumerable: true,
  get: function () {
    return _gridLegacyClasses.default;
  }
});
var _GridLegacy = _interopRequireDefault(require("./GridLegacy"));
var _gridLegacyClasses = _interopRequireWildcard(require("./gridLegacyClasses"));
Object.keys(_gridLegacyClasses).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _gridLegacyClasses[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gridLegacyClasses[key];
    }
  });
});