"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var legacy_1 = __importDefault(require("./legacy"));
var utils_functions_1 = require("./utils-functions");
var utils_functions_2 = require("./utils-functions");
Object.defineProperty(exports, "getStatusCode", { enumerable: true, get: function () { return utils_functions_2.getStatusCode; } });
Object.defineProperty(exports, "getReasonPhrase", { enumerable: true, get: function () { return utils_functions_2.getReasonPhrase; } });
Object.defineProperty(exports, "getStatusText", { enumerable: true, get: function () { return utils_functions_2.getStatusText; } });
var status_codes_1 = require("./status-codes");
Object.defineProperty(exports, "StatusCodes", { enumerable: true, get: function () { return status_codes_1.StatusCodes; } });
var reason_phrases_1 = require("./reason-phrases");
Object.defineProperty(exports, "ReasonPhrases", { enumerable: true, get: function () { return reason_phrases_1.ReasonPhrases; } });
__exportStar(require("./legacy"), exports);
exports.default = __assign(__assign({}, legacy_1.default), { getStatusCode: utils_functions_1.getStatusCode,
    getStatusText: utils_functions_1.getStatusText });
